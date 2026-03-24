/**
 * 日记正文加密（浏览器端 Web Crypto）
 * 格式：ENC1:<base64url(version|salt|iv|ciphertext)>
 */
(function (global) {
    var MAGIC = 'ENC1';
    var PBKDF2_ITER = 150000;

    function u8ToB64Url(u8) {
        var bin = '';
        var chunk = 0x8000;
        for (var i = 0; i < u8.length; i += chunk) {
            bin += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
        }
        return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function b64UrlToU8(s) {
        s = s.replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4) s += '=';
        var bin = atob(s);
        var u8 = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        return u8;
    }

    function deriveKey(password, salt) {
        var enc = new TextEncoder();
        return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']).then(function (keyMaterial) {
            return crypto.subtle.deriveKey(
                { name: 'PBKDF2', salt: salt, iterations: PBKDF2_ITER, hash: 'SHA-256' },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                false,
                ['encrypt', 'decrypt']
            );
        });
    }

    function diaryEncrypt(password, plaintext) {
        if (!password || !plaintext) return Promise.reject(new Error('缺少密码或正文'));
        var enc = new TextEncoder();
        var salt = crypto.getRandomValues(new Uint8Array(16));
        var iv = crypto.getRandomValues(new Uint8Array(12));
        return deriveKey(password, salt).then(function (key) {
            return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(plaintext));
        }).then(function (ciphertext) {
            var ct = new Uint8Array(ciphertext);
            var packed = new Uint8Array(1 + 16 + 12 + ct.length);
            packed[0] = 1;
            packed.set(salt, 1);
            packed.set(iv, 17);
            packed.set(ct, 29);
            return MAGIC + ':' + u8ToB64Url(packed);
        });
    }

    function diaryDecrypt(password, packedLine) {
        if (!password) return Promise.reject(new Error('请输入密码'));
        var trimmed = (packedLine || '').trim();
        if (trimmed.indexOf(MAGIC + ':') !== 0) return Promise.reject(new Error('不是加密日记'));
        var payload = trimmed.slice(MAGIC.length + 1);
        var packed = b64UrlToU8(payload);
        if (packed.length < 30 || packed[0] !== 1) return Promise.reject(new Error('数据损坏'));
        var salt = packed.slice(1, 17);
        var iv = packed.slice(17, 29);
        var ct = packed.slice(29);
        return deriveKey(password, salt).then(function (key) {
            return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct);
        }).then(function (buf) {
            return new TextDecoder().decode(buf);
        });
    }

    global.diaryEncrypt = diaryEncrypt;
    global.diaryDecrypt = diaryDecrypt;
})(typeof window !== 'undefined' ? window : globalThis);
