// 用户数据 - 此文件需要随项目一起分发
// 添加新用户后，请在管理员页面点击"导出用户"更新此文件

var incenseUsersData = {
    "users": [
    {
        "id": "user_default_admin",
        "username": "13371053199",
        "password": "chengyu2003",
        "name": "超级管理员",
        "role": "super_admin",
        "createdAt": "2026-06-13T07:33:33.000Z"
    },
    {
        "id": "user_1781347042006",
        "username": "17680012778",
        "password": "123456",
        "name": "123",
        "role": "user",
        "createdAt": "2026-06-13T10:37:22.006Z"
    }
]
};

// 初始化用户数据到 localStorage
(function() {
    var storedUsers = localStorage.getItem('incense_users');
    var fileUsers = incenseUsersData.users || [];
    var mergedUsers = [];
    
    // 先添加文件中的用户
    fileUsers.forEach(function(user) {
        mergedUsers.push(user);
    });
    
    // 如果 localStorage 中有用户，合并去重
    if (storedUsers) {
        try {
            var localUsers = JSON.parse(storedUsers);
            localUsers.forEach(function(user) {
                var exists = mergedUsers.some(function(u) {
                    return u.username === user.username;
                });
                if (!exists) {
                    mergedUsers.push(user);
                }
            });
        } catch (e) {}
    }
    
    // 保存合并后的用户
    localStorage.setItem('incense_users', JSON.stringify(mergedUsers));
})();