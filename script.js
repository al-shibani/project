// بيانات وهمية لمقدمي الخدمات مع مسارات الصور الصحيحة
const providersData = [
    {
        id: 1,
        name: "أحمد محمد",
        specialty: "كهرباء",
        experience: 5,
        rating: 4.5,
        image: "eng.png"
    },
    {
        id: 2,
        name: "محمود علي",
        specialty: "سباكة",
        experience: 7,
        rating: 4.8,
        image: "ss.jpg"
    },
    {
        id: 3,
        name: "سامي خالد",
        specialty: "نجارة",
        experience: 10,
        rating: 4.7,
        image: "nn.jpeg"
    },
    {
        id: 4,
        name: "نورا أحمد",
        specialty: "تنظيف",
        experience: 3,
        rating: 4.3,
        image: "nnn.png"
    },
    {
        id: 5,
        name: "علي حسن",
        specialty: "برمجة",
        experience: 8,
        rating: 4.9,
        image: "mmm.jpeg"
    },
    {
        id: 6,
        name: "محمد الشسياني",
        specialty: "طاقة شمسية",
        experience: 12,
        rating: 5.0,
        image: "immg.jpg"
    }
];

// دالة لتحويل رمز التخصص إلى اسم
function getSpecialtyName(specialty) {
    const specialties = {
        'electricity': 'كهرباء',
        'plumbing': 'سباكة',
        'carpentry': 'نجارة',
        'programming': 'برمجة',
        'cleaning': 'تنظيف'
    };
    return specialties[specialty] || specialty;
}

// دالة لتوليد نجوم التقييم
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// دالة لعرض مقدمي الخدمات مع التحقق من الصور
function displayProviders() {
    const providersContainer = document.getElementById('providers-container');
    providersContainer.innerHTML = '';
    
    providersData.forEach(provider => {
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        
        // إنشاء عنصر الصورة مع التحقق من وجودها
        const imgElement = document.createElement('img');
        imgElement.src = `${provider.image}`;
        imgElement.alt = provider.name;
        imgElement.onerror = function() {
            // إذا فشل تحميل الصورة، عرض صورة افتراضية
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="40" r="30" fill="%234CAF50"/%3E%3Ctext x="50" y="90" text-anchor="middle" font-size="40" fill="%23fff"%3E' + 
                        provider.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
            this.style.objectFit = 'contain';
            this.parentElement.style.backgroundColor = '#e0e0e0';
        };
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'provider-image';
        imageContainer.appendChild(imgElement);
        
        providerCard.innerHTML = `
            <div class="provider-info">
                <h3>${provider.name}</h3>
                <span class="provider-specialty">${getSpecialtyName(provider.specialty)}</span>
                <div class="provider-rating">
                    ${generateRatingStars(provider.rating)}
                    <span>(${provider.rating})</span>
                </div>
                <div class="provider-experience">
                    <i class="fas fa-briefcase"></i>
                    <span>${provider.experience} سنوات خبرة</span>
                </div>
                <button class="btn" onclick="requestService('${provider.specialty}')">طلب الخدمة</button>
            </div>
        `;
        
        providerCard.prepend(imageContainer);
        providersContainer.appendChild(providerCard);
        
        // تسجيل تحميل الصور في الكونسول لفحصها
        console.log(`محاولة تحميل الصورة من: images/${provider.image}`);
    });
}

// دالة لطلب خدمة
function requestService(serviceType) {
    const modal = document.getElementById('service-request-modal');
    const serviceTypeInput = document.getElementById('service-type');
    
    serviceTypeInput.value = serviceType;
    modal.style.display = 'block';
    console.log(`طلب خدمة: ${serviceType}`);
}

// دالة لفتح نموذج تسجيل الدخول
function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
    console.log('فتح نموذج تسجيل الدخول');
}

// دالة لفتح نموذج إنشاء حساب
function openRegisterModal() {
    document.getElementById('register-modal').style.display = 'block';
    console.log('فتح نموذج إنشاء حساب');
}

// دالة لإغلاق النماذج المنبثقة
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    console.log('إغلاق جميع النماذج');
}

// دالة لعرض/إخفاء حقول مقدم الخدمة عند التسجيل
function toggleProviderFields() {
    const userType = document.getElementById('register-user-type').value;
    const providerFields = document.getElementById('provider-fields');
    
    providerFields.style.display = userType === 'provider' ? 'block' : 'none';
    console.log(`تغيير نوع المستخدم إلى: ${userType}`);
}

// دالة لفتح/إغلاق القائمة الجانبية للجوال
function toggleMobileMenu() {
    document.querySelector('.mobile-menu').classList.toggle('active');
    console.log('تبديل حالة القائمة الجانبية');
}

// تهيئة الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض مقدمي الخدمات
    displayProviders();
    
    // أحداث النقر على بطاقات الخدمات
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            requestService(serviceType);
        });
    });
    
    // أحداث النماذج المنبثقة
    document.getElementById('login-btn').addEventListener('click', openLoginModal);
    document.getElementById('register-btn').addEventListener('click', openRegisterModal);
    document.getElementById('mobile-login-btn').addEventListener('click', openLoginModal);
    document.getElementById('mobile-register-btn').addEventListener('click', openRegisterModal);
    document.getElementById('show-register').addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
        openRegisterModal();
    });
    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
        openLoginModal();
    });
    
    // أحداث إغلاق النماذج
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // النقر خارج النموذج يغلقه
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // أحداث القائمة الجانبية للجوال
    document.querySelector('.mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    document.querySelector('.mobile-menu .close-btn').addEventListener('click', toggleMobileMenu);
    
    // تغيير حقول مقدم الخدمة عند تغيير نوع المستخدم
    document.getElementById('register-user-type').addEventListener('change', toggleProviderFields);
    
    // إرسال نموذج طلب الخدمة
    document.getElementById('service-request-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('تم إرسال طلب الخدمة بنجاح! سنقوم بالتواصل معك قريبًا.');
        closeModal();
        console.log('تم إرسال طلب الخدمة');
    });
    
    // إرسال نموذج تسجيل الدخول
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('تم تسجيل الدخول بنجاح!');
        closeModal();
        console.log('تم تسجيل الدخول');
    });
    
    // إرسال نموذج إنشاء حساب
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
        closeModal();
        console.log('تم إنشاء حساب جديد');
    });
    
    // التحقق من تحميل الصور عند بدء التشغيل
    console.log('تم تحميل الصفحة بنجاح');
});