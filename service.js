document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('bx-x');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('bx-x');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('bx-x');
            mobileMenu.classList.remove('active');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Payment Modal Functionality
    const paymentModal = document.getElementById('paymentModal');
    const successModal = document.getElementById('successModal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.close-modal');
    const closeSuccess = document.getElementById('closeSuccess');
    const paymentForm = document.getElementById('paymentForm');
    
    // Open payment modal when clicking Book Now
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.getAttribute('data-service');
            const servicePrice = button.getAttribute('data-price');
            
            document.getElementById('serviceName').value = serviceName;
            document.getElementById('servicePrice').value = 'KSh ' + Number(servicePrice).toLocaleString('en-KE');
            
            paymentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    closeSuccess.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission (simulating M-Pesa payment)
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const phoneNumber = document.getElementById('phoneNumber').value;
        const amount = document.getElementById('servicePrice').value.replace(/\D/g, '');
        
        // Validate phone number (Kenyan format)
        if (!/^254[17]\d{8}$/.test(phoneNumber)) {
            alert('Please enter a valid Kenyan phone number starting with 254');
            return;
        }
        
        // Simulate M-Pesa payment processing
        simulateMpesaPayment(phoneNumber, amount);
    });
    
    // Function to simulate M-Pesa payment
    function simulateMpesaPayment(phone, amount) {
        // In a real implementation, you would connect to an M-Pesa API like Safaricom's Daraja API
        // This is just a simulation for demonstration purposes
        
        // Show loading state
        const submitBtn = paymentForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Processing Payment...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Close payment modal
            paymentModal.style.display = 'none';
            
            // Show success modal
            successModal.style.display = 'flex';
            
            // Reset form
            paymentForm.reset();
            submitBtn.innerHTML = '<span>Pay via M-Pesa</span><i class="bx bx-money"></i>';
            submitBtn.disabled = false;
            
            // In a real implementation, you would:
            // 1. Send payment request to your backend
            // 2. Backend would initiate M-Pesa STK push
            // 3. Handle payment confirmation callback
            // 4. Send booking confirmation email
        }, 3000);
    }
    
    // Format phone number input
    const phoneInput = document.getElementById('phoneNumber');
    phoneInput.addEventListener('input', function() {
        // Remove all non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Format as Kenyan phone number
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d{1,3})/, '$1$2');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1$2$3');
        }
        
        // Ensure it starts with 254
        if (!value.startsWith('254') && value.length > 0) {
            if (value.startsWith('0')) {
                value = '254' + value.substring(1);
            } else if (value.startsWith('7') || value.startsWith('1')) {
                value = '254' + value;
            }
        }
        
        this.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials
    function autoRotateTestimonials() {
        let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextTestimonial);
    }
    
    // Set interval for auto-rotation
    let testimonialInterval = setInterval(autoRotateTestimonials, 5000);
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            testimonialInterval = setInterval(autoRotateTestimonials, 5000);
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Close all other items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    

    
});