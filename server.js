const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// إعداد CORS
app.use(cors());

// تقديم الملفات الثابتة من المجلد الرئيسي
app.use(express.static(__dirname));

// تقديم الملفات الثابتة من المجلد public
app.use('/public', express.static(path.join(__dirname, 'public')));

// المسار الرئيسي
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'index.html'));
});

// مسار لوحة التحكم
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'index.html'));
});

// مسار الفواتير
app.get('/dashboard/invoices', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'invoices', 'index.html'));
});

// مسار المخزون
app.get('/dashboard/inventory', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'inventory', 'index.html'));
});

// مسار التحميل الرئيسي
app.get('/download/:platform', (req, res) => {
    const { platform } = req.params;
    let filePath;
    let fileName;

    switch (platform) {
        case 'windows':
            fileName = 'EmadERP-Setup-Windows.exe';
            filePath = path.join(__dirname, 'downloads', fileName);
            break;
        case 'mac':
            fileName = 'EmadERP-Setup-Mac.dmg';
            filePath = path.join(__dirname, 'downloads', fileName);
            break;
        case 'linux':
            fileName = 'EmadERP-Setup-Linux.AppImage';
            filePath = path.join(__dirname, 'downloads', fileName);
            break;
        default:
            return res.status(400).send('نظام تشغيل غير معروف');
    }

    // التحقق من وجود الملف
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('الملف غير موجود');
    }

    // إحصائيات التحميل
    const stats = {
        platform,
        timestamp: new Date(),
        userAgent: req.headers['user-agent']
    };
    logDownload(stats);

    // إرسال الملف
    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('خطأ في التحميل:', err);
            if (!res.headersSent) {
                res.status(500).send('خطأ في التحميل');
            }
        }
    });
});

// تسجيل إحصائيات التحميل
function logDownload(stats) {
    const logPath = path.join(__dirname, 'logs', 'downloads.log');
    const logEntry = `${stats.timestamp.toISOString()} | ${stats.platform} | ${stats.userAgent}\n`;
    
    fs.appendFile(logPath, logEntry, (err) => {
        if (err) console.error('خطأ في تسجيل التحميل:', err);
    });
}

// التعامل مع الأخطاء
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('حدث خطأ في الخادم');
});

// بدء الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
    
    // إنشاء المجلدات المطلوبة إذا لم تكن موجودة
    const dirs = ['downloads', 'logs', 'public'];
    dirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
});
