// Имитация асинхронных функций
const db = {
    findPost: (postId, callback) => {
        setTimeout(() => {
            console.log("🔍 Ищем пост в базе...");
            callback({ 
                id: postId, 
                authorId: 1, 
                image: "photo.jpg" 
            });
        }, 1000);
    },
    
    updateStatus: (postId, status, callback) => {
        setTimeout(() => {
            console.log(`📊 Обновляем статус на "${status}"...`);
            callback();
        }, 500);
    }
};

const auth = {
    checkPermissions: (authorId, callback) => {
        setTimeout(() => {
            console.log("🔐 Проверяем права...");
            callback(true); // Всегда true для примера
        }, 800);
    }
};

const image = {
    compress: (image, callback) => {
        setTimeout(() => {
            console.log("🖼️ Сжимаем картинку...");
            callback("compressed_" + image);
        }, 1200);
    }
};

const api = {
    upload: (image, callback) => {
        setTimeout(() => {
            console.log("☁️ Загружаем на сервер...");
            callback("https://server.com/" + image);
        }, 1500);
    }
};

// Твоя функция (немного исправлена)
const publishPost = (postId) => {
    console.log("🚀 Начинаем публикацию..."); // 1

    // Колбэк №1: Ищем пост в базе (асинхронно)
    db.findPost(postId, (post) => {
        console.log("✅ Пост найден"); // 3

        // Колбэк №2: Проверяем права пользователя (асинхронно)
        auth.checkPermissions(post.authorId, (hasAccess) => {
            if (hasAccess) {
                console.log("✅ Доступ разрешен"); // 4

                // Колбэк №3: Сжимаем картинку перед загрузкой (асинхронно)
                image.compress(post.image, (compressedImg) => {
                    console.log("✅ Картинка сжата"); // 5

                    // Колбэк №4: Загружаем на сервер (асинхронно)
                    api.upload(compressedImg, (url) => {
                        console.log("✅ Загружено по адресу:", url); // 6

                        // Колбэк №5: Обновляем статус в базе (асинхронно)
                        db.updateStatus(postId, "published", () => {
                            console.log("🎉 Пост опубликован!"); // 7
                        });
                    });
                });
            }
        });
    });
    
    console.log("⏳ Код пошел дальше, пока мы ждем базу данных..."); // 2
};

// Вызываем функцию
publishPost(123);

console.log("📝 Этот код выполнится сразу после вызова publishPost");