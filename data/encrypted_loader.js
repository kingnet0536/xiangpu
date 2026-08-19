// 加密数据加载器
// 按需加载各分组的加密数据

const EncryptedDataLoader = {
    loadedImages: {},
    loadedTexts: null,
    
    // 加载指定分组的图片数据
    loadImages: function(group) {
        if (this.loadedImages[group]) {
            return this.loadedImages[group];
        }
        
        // 根据分组名称映射到对应的加密数据变量
        const varName = 'ENCRYPTED_IMAGES_' + group.replace('式', '').replace('参差', 'CD');
        if (typeof window[varName] !== 'undefined') {
            this.loadedImages[group] = window[varName];
            return window[varName];
        }
        
        console.error('加密图片数据未加载:', group);
        return null;
    },
    
    // 加载文字数据
    loadTexts: function() {
        if (this.loadedTexts) {
            return this.loadedTexts;
        }
        
        if (typeof ENCRYPTED_TEXTS !== 'undefined') {
            this.loadedTexts = ENCRYPTED_TEXTS;
            return ENCRYPTED_TEXTS;
        }
        
        console.error('加密文字数据未加载');
        return null;
    },
    
    // 获取指定图片
    getImage: function(group, number) {
        const images = this.loadImages(group);
        if (images && images[number]) {
            return DecryptUtils.decryptImage(images[number]);
        }
        return null;
    },
    
    // 获取指定文字内容
    getText: function(name) {
        const texts = this.loadTexts();
        if (texts && texts[name]) {
            return DecryptUtils.decryptText(texts[name]);
        }
        return '';
    }
};

window.EncryptedDataLoader = EncryptedDataLoader;
