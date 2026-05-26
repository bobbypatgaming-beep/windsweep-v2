/* ==========================================================================
   Windsweep Education - Interactive Logic Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. Header Scroll Animation
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------------------
       2. Mobile Menu Toggle
       ---------------------------------------------------------------------- */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            // Toggle hamburger icon animation
            mobileMenuToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars-staggered"></i>';
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
            });
        });
    }



    /* ----------------------------------------------------------------------
       4. FAQ Accordion Logic
       ---------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        
        trigger.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');
            
            // Close all open FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.faq-panel').style.maxHeight = null;
            });
            
            // Toggle clicked FAQ
            if (!isCurrentlyActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                // Calculate scrollheight dynamically for custom transition heights
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    /* ----------------------------------------------------------------------
       5. Parents Testimonials Slider
       ---------------------------------------------------------------------- */
    const slider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    
    // Function to render slide index
    const showSlide = (index) => {
        // Handle wrap arounds
        if (index >= slideCount) currentSlide = 0;
        else if (index < 0) currentSlide = slideCount - 1;
        else currentSlide = index;

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });

        // Show active slide
        const activeSlide = slides[currentSlide];
        activeSlide.style.display = 'block';
        setTimeout(() => activeSlide.classList.add('active'), 50);

        // Update indicator dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    };

    // Controller button clicks
    if (prevBtn && nextBtn && dotsContainer) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });

        // Dots trigger navigation
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const targetIdx = parseInt(e.target.getAttribute('data-index'));
                showSlide(targetIdx);
                resetAutoSlide();
            }
        });

        // Initialize Auto Slide rotation
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 7000); // Rotate every 7 seconds
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Pause rotation on hover
        const wrapper = document.querySelector('.slider-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            wrapper.addEventListener('mouseleave', startAutoSlide);
        }

        startAutoSlide();
    }

    /* ----------------------------------------------------------------------
       6. Interactive Math Challenge Quiz Logic
       ---------------------------------------------------------------------- */
    const quizQuestions = [
        {
            text: "A pattern of shapes repeats: Triangle, Square, Pentagon, Hexagon... What is the 101st shape in this pattern?",
            options: ["Triangle", "Square", "Pentagon", "Hexagon"],
            correctIndex: 0,
            explanation: "The pattern repeats every 4 shapes. Dividing 101 by 4 gives a remainder of 1 (101 ÷ 4 = 25 remainder 1). The remainder of 1 means it is the first shape in the pattern, which is a Triangle! Windsweep tutors show students how to identify pattern divisions instantly on exam day.",
            difficulty: "Medium"
        },
        {
            text: "A jar contains blue and green marbles in the ratio 3:5. If there are 40 marbles in total, how many green marbles are there?",
            options: ["15 marbles", "20 marbles", "25 marbles", "30 marbles"],
            correctIndex: 2,
            explanation: "The ratio has 3 + 5 = 8 total parts. Since the total is 40 marbles, each ratio unit represents 40 ÷ 8 = 5 marbles. Since green marbles represent 5 parts, there are 5 parts × 5 marbles = 25 green marbles. Visualizing ratio models is a core exam skill we teach.",
            difficulty: "Medium"
        },
        {
            text: "A rectangular playground has a perimeter of 24 meters. If its length is exactly twice its width, what is its area in square meters?",
            options: ["18 m²", "32 m²", "36 m²", "48 m²"],
            correctIndex: 1,
            explanation: "Let the width be W. Length is twice the width (2W). The perimeter is 2 × (Length + Width) = 2 × (2W + W) = 6W = 24 meters. This gives Width = 4m and Length = 8m. Area = Length × Width = 8m × 4m = 32 square meters. Solving algebraic perimeter word problems is critical for Selective School exams!",
            difficulty: "Hard"
        }
    ];

    let quizIndex = 0;
    let quizScore = 0;
    
    const quizBox = document.getElementById('quiz-box');
    let quizProgress = document.getElementById('quiz-progress');
    let questionNumText = document.getElementById('question-num');
    let difficultyText = document.getElementById('question-diff');
    let questionBodyText = document.getElementById('question-text');
    let optionsContainer = document.getElementById('options-container');
    let feedbackBox = document.getElementById('quiz-feedback-box');
    let feedbackIcon = document.getElementById('feedback-icon');
    let feedbackTitle = document.getElementById('feedback-title');
    let feedbackExplanation = document.getElementById('feedback-explanation');
    let nextQuestionBtn = document.getElementById('btn-next-question');

    const loadQuestion = () => {
        // Reset Feedback
        feedbackBox.classList.add('hidden');
        
        const q = quizQuestions[quizIndex];
        
        // Progress Bar
        const progressPercent = ((quizIndex + 1) / quizQuestions.length) * 100;
        quizProgress.style.width = `${progressPercent}%`;
        
        // Texts
        questionNumText.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
        difficultyText.textContent = `Difficulty: ${q.difficulty}`;
        questionBodyText.textContent = q.text;
        
        // Options
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span>${opt}</span>
                <span class="option-badge">${String.fromCharCode(65 + idx)}</span>
            `;
            btn.addEventListener('click', () => handleOptionSelection(idx));
            optionsContainer.appendChild(btn);
        });
    };

    const handleOptionSelection = (selectedIndex) => {
        const q = quizQuestions[quizIndex];
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        
        // Lock all options
        optionButtons.forEach(btn => btn.disabled = true);
        
        const isCorrect = (selectedIndex === q.correctIndex);
        if (isCorrect) {
            quizScore++;
            optionButtons[selectedIndex].classList.add('correct');
            feedbackIcon.className = 'feedback-icon correct';
            feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            feedbackTitle.textContent = 'Correct Answer! Outstanding.';
        } else {
            optionButtons[selectedIndex].classList.add('incorrect');
            optionButtons[q.correctIndex].classList.add('correct');
            feedbackIcon.className = 'feedback-icon incorrect';
            feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
            feedbackTitle.textContent = 'Incorrect Answer';
        }
        
        feedbackExplanation.textContent = q.explanation;
        feedbackBox.classList.remove('hidden');
    };

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            quizIndex++;
            if (quizIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showQuizResults();
            }
        });
    }

    const showQuizResults = () => {
        quizProgress.style.width = '100%';
        
        let scoreHeadline = '';
        let scoreSubText = '';
        let badgeClass = '';
        
        if (quizScore === 3) {
            scoreHeadline = '3/3 Perfect Score! Math Champion.';
            scoreSubText = 'Your child demonstrates excellent problem-solving instincts! They are in prime position to prepare for selective admissions success.';
            badgeClass = 'fa-trophy text-orange';
        } else if (quizScore === 2) {
            scoreHeadline = '2/3 Strong Foundation!';
            scoreSubText = 'Great effort! Your child has good logical reasoning, but learning strategic exam patterns can help push them to full marks.';
            badgeClass = 'fa-medal text-secondary';
        } else {
            scoreHeadline = `${quizScore}/3 Practice Makes Perfect!`;
            scoreSubText = 'A solid attempt! Selective reasoning is a muscle that needs training. Early guidance with Windsweep will help unlock their mathematical potential.';
            badgeClass = 'fa-brain text-teal';
        }
        
        quizBox.innerHTML = `
            <div class="quiz-results-screen text-center animate-fade-in" style="padding: 10px 0;">
                <div class="result-icon-container" style="font-size: 3.5rem; margin-bottom: 20px;">
                    <i class="fa-solid ${badgeClass}"></i>
                </div>
                <h3 class="result-headline" style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; margin-bottom: 12px;">${scoreHeadline}</h3>
                <p class="result-subtext" style="font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 28px;">${scoreSubText}</p>
                
                <div class="results-offer-card glass-card" style="background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); padding: 24px; border-radius: var(--radius-md); margin-bottom: 30px; color: #ffffff; text-align: left;">
                    <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 10px;">
                        <i class="fa-solid fa-gift" style="color: var(--accent); font-size: 1.25rem;"></i>
                        <span style="font-family: var(--font-heading); font-weight: 700; color: #ffffff; font-size: 1.05rem;">Special Offer Unlocked!</span>
                    </div>
                    <p style="font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.4;">Claim a **First Lesson 50% Off** trial discount today when signing up through the official registry form below.</p>
                </div>
                
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScg-Az_RTvl-pivvatEzIrsgfOJMRWoeINuW23JbCbPCTWDvw/viewform?usp=dialog" target="_blank" class="btn btn-primary pulse-shadow">
                        <span>Register with 50% Off</span>
                        <i class="fa-solid fa-arrow-trend-up"></i>
                    </a>
                    <button class="btn btn-secondary" id="btn-restart-quiz" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.1); color: #ffffff;">
                        <span>Try Again</span>
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('btn-restart-quiz').addEventListener('click', () => {
            quizIndex = 0;
            quizScore = 0;
            
            // Restore quiz box HTML
            quizBox.innerHTML = `
                <div class="quiz-progress-bar">
                    <div class="progress-fill" id="quiz-progress" style="width: 33.3%;"></div>
                </div>
                
                <div class="quiz-header">
                    <span class="question-number" id="question-num">Question 1 of 3</span>
                    <span class="question-difficulty" id="question-diff">Difficulty: Medium</span>
                </div>

                <div class="quiz-question-body" id="quiz-question-body">
                    <p class="question-text" id="question-text">Loading question...</p>
                    <div class="options-container" id="options-container"></div>
                </div>

                <div class="quiz-feedback-box hidden" id="quiz-feedback-box">
                    <div class="feedback-icon" id="feedback-icon"></div>
                    <div class="feedback-text-container">
                        <h4 class="feedback-title" id="feedback-title">Correct!</h4>
                        <p class="feedback-explanation" id="feedback-explanation">Explanation here.</p>
                    </div>
                    <button class="btn btn-secondary btn-sm" id="btn-next-question">
                        <span>Next Question</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            `;
            
            // Re-cache DOM refs
            reCacheQuizElements();
            
            // Reload Question
            loadQuestion();
        });
    };
    
    const reCacheQuizElements = () => {
        quizProgress = quizBox.querySelector('#quiz-progress');
        questionNumText = quizBox.querySelector('#question-num');
        difficultyText = quizBox.querySelector('#question-diff');
        questionBodyText = quizBox.querySelector('#question-text');
        optionsContainer = quizBox.querySelector('#options-container');
        feedbackBox = quizBox.querySelector('#quiz-feedback-box');
        feedbackIcon = quizBox.querySelector('#feedback-icon');
        feedbackTitle = quizBox.querySelector('#feedback-title');
        feedbackExplanation = quizBox.querySelector('#feedback-explanation');
        nextQuestionBtn = quizBox.querySelector('#btn-next-question');
        
        nextQuestionBtn.addEventListener('click', () => {
            quizIndex++;
            if (quizIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showQuizResults();
            }
        });
    };

    // Initial load
    if (quizBox) {
        loadQuestion();
    }
});
