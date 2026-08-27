// Google Drive Integration via Google Identity Services and Google Drive REST API

const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const BACKUP_FILENAME = 'fitness_tracker_backup.json';

class GoogleDriveManager {
  constructor() {
    this.tokenClient = null;
    this.accessToken = null;
    this.clientId = localStorage.getItem('fit_tracker_gdrive_client_id') || '';
  }

  setClientId(clientId) {
    this.clientId = clientId;
    localStorage.setItem('fit_tracker_gdrive_client_id', clientId);
  }

  getClientId() {
    return this.clientId;
  }

  initTokenClient(callback) {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
      throw new Error('کتابخانه Google Identity Services لود نشده است.');
    }

    if (!this.clientId) {
      throw new Error('لطفاً ابتدا Client ID گوگل خود را در بخش تنظیمات وارد کنید.');
    }

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: SCOPES,
      callback: (response) => {
        if (response.error !== undefined) {
          throw response;
        }
        this.accessToken = response.access_token;
        if (callback) callback(this.accessToken);
      },
    });
  }

  requestAccessToken(callback) {
    this.initTokenClient(callback);
    this.tokenClient.requestAccessToken({ prompt: 'consent' });
  }

  async findBackupFile(token) {
    const q = `name = '${BACKUP_FILENAME}' and trashed = false`;
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id, name, modifiedTime)`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('خطا در جستجوی فایل در گوگل درایو');
    const data = await res.json();
    return data.files && data.files.length > 0 ? data.files[0] : null;
  }

  async uploadBackup(token, backupPayload) {
    const fileContent = JSON.stringify(backupPayload, null, 2);
    const existing = await this.findBackupFile(token);

    if (existing) {
      // Update existing file
      const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=media`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: fileContent
      });
      if (!res.ok) throw new Error('خطا در به‌روزرسانی فایل در گوگل درایو');
      return await res.json();
    } else {
      // Create new file
      const metadata = {
        name: BACKUP_FILENAME,
        mimeType: 'application/json'
      };
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', new Blob([fileContent], { type: 'application/json' }));

      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      });
      if (!res.ok) throw new Error('خطا در ایجاد فایل در گوگل درایو');
      return await res.json();
    }
  }

  async downloadBackup(token) {
    const existing = await this.findBackupFile(token);
    if (!existing) {
      throw new Error('فایل بکاپی در گوگل درایو شما پیدا نشد.');
    }

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${existing.id}?alt=media`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('خطا در دانلود فایل از گوگل درایو');
    return await res.json();
  }
}

export const googleDrive = new GoogleDriveManager();
