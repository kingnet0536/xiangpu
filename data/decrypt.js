/**
 * 解密模块
 * 用于解密加密的图片和文字数据
 */

// 解密密钥（与加密工具对应）
const SECRET_KEY = "xiangpu_encryption_key_2024";

/**
 * XOR解密算法
 * @param {Uint8Array} data - 加密的数据
 * @param {string} key - 解密密钥
 * @returns {Uint8Array} - 解密后的数据
 */
function xorDecrypt(data, key) {
    const keyBytes = new TextEncoder().encode(key);
    const keyLen = keyBytes.length;
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        result[i] = data[i] ^ keyBytes[i % keyLen];
    }
    return result;
}

/**
 * 解密Base64编码的加密数据
 * @param {string} encryptedBase64 - Base64编码的加密数据
 * @returns {Uint8Array} - 解密后的原始数据
 */
function decryptData(encryptedBase64) {
    try {
        // Base64解码
        const encryptedBytes = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
        // XOR解密
        return xorDecrypt(encryptedBytes, SECRET_KEY);
    } catch (e) {
        console.error('解密失败:', e);
        return null;
    }
}

/**
 * 解密并获取图片URL
 * @param {string} encryptedBase64 - 加密的图片数据
 * @returns {string} - 可用的图片URL（Blob URL）
 */
function decryptImage(encryptedBase64) {
    try {
        const decryptedBytes = decryptData(encryptedBase64);
        if (!decryptedBytes) return null;
        
        // 创建Blob
        const blob = new Blob([decryptedBytes], { type: 'image/png' });
        // 创建URL
        return URL.createObjectURL(blob);
    } catch (e) {
        console.error('图片解密失败:', e);
        return null;
    }
}

/**
 * 解密并获取文字内容
 * @param {string} encryptedBase64 - 加密的文字数据
 * @returns {string} - 解密后的文字内容
 */
function decryptText(encryptedBase64) {
    try {
        const decryptedBytes = decryptData(encryptedBase64);
        if (!decryptedBytes) return '';
        
        // 解码为文字
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(decryptedBytes);
    } catch (e) {
        console.error('文字解密失败:', e);
        return '';
    }
}

/**
 * 从加密数据中获取指定图片
 * @param {string} group - 样式分组
 * @param {string|number} number - 图片编号
 * @returns {string} - 图片URL
 */
function getEncryptedImage(group, number) {
    if (!ENCRYPTED_DATA || !ENCRYPTED_DATA.images) {
        console.error('加密数据未加载');
        return null;
    }
    
    const groupData = ENCRYPTED_DATA.images[group];
    if (!groupData) {
        console.error('分组不存在:', group);
        return null;
    }
    
    const encrypted = groupData[String(number)];
    if (!encrypted) {
        console.error('图片不存在:', group, number);
        return null;
    }
    
    return decryptImage(encrypted);
}

/**
 * 从加密数据中获取指定文字内容
 * @param {string} name - 文件名称
 * @returns {string} - 文字内容
 */
function getEncryptedText(name) {
    if (!ENCRYPTED_DATA || !ENCRYPTED_DATA.texts) {
        console.error('加密数据未加载');
        return '';
    }
    
    const encrypted = ENCRYPTED_DATA.texts[name];
    if (!encrypted) {
        console.error('文字文件不存在:', name);
        return '';
    }
    
    return decryptText(encrypted);
}

/**
 * 清理Blob URL（释放内存）
 * @param {string} url - Blob URL
 */
function revokeImageUrl(url) {
    if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
    }
}

// 导出函数
window.DecryptUtils = {
    decryptData,
    decryptImage,
    decryptText,
    getEncryptedImage,
    getEncryptedText,
    revokeImageUrl,
    SECRET_KEY
};