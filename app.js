// Core Saudi - Interactive Salla Twilight App Controller
document.addEventListener('alpine:init', () => {
    Alpine.data('coreStore', () => ({
        mode: 'single', // 'single' or 'duo'
        singleScent: 'pandura',
        duoPicks: ['ophira', 'pandura'],
        expandedDesc: 'pandura',
        showQuiz: false,
        quizStep: 0,
        quizAnswers: [],
        quizFinished: false,
        quizTopMatch: 'pandura',

        // Product Catalog Configuration matching Core Saudi / Fragrant Oasis
        scents: [
            {
                id: 'paradus',
                name: 'بارادوس',
                en: 'Paradus',
                mood: 'ناعم · مسكي · خشبي',
                desc: 'رائحة ناعمة تجمع بين الورد الدمشقي وخشب الصندل، مع لمسات دافئة من المسك والعنبر.',
                notes: { top: 'الورد الدمشقي', heart: 'خشب الصندل', base: 'المسك والعنبر' },
                image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
                soldOut: true
            },
            {
                id: 'ophira',
                name: 'أوفيرا',
                en: 'Ophira',
                mood: 'دافئ · شرقي · خشبي',
                desc: 'رائحة دافئة تجمع بين الزعفران والبرغموت، مع حضور واضح للعود ولمسات من التونكا.',
                notes: { top: 'الزعفران والبرغموت', heart: 'العود', base: 'التونكا' },
                image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
                soldOut: false
            },
            {
                id: 'pandura',
                name: 'باندورا',
                en: 'Pandura',
                mood: 'زهري · مسكي · بودري',
                desc: 'رائحة زهرية ناعمة تجمع بين الياسمين والورد البلغاري، مع المسك والباتشولي بطابع هادئ.',
                notes: { top: 'الياسمين والورد البلغاري', heart: 'المسك', base: 'الباتشولي' },
                image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
                soldOut: false
            },
            {
                id: 'solara',
                name: 'سولارا',
                en: 'Solara',
                mood: 'منعش · حمضي · زهري',
                desc: 'رائحة منعشة تبدأ بالأناناس والحمضيات، مع لمسات من الفلفل الوردي والمسك والفيتيفر.',
                notes: { top: 'الأناناس والحمضيات', heart: 'الفلفل الوردي والياسمين', base: 'المسك والفيتيفر' },
                image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
                soldOut: false
            },
            {
                id: 'camillia',
                name: 'كاميليا',
                en: 'Camillia',
                mood: 'فاكهي · حلو · زهري',
                desc: 'رائحة فاكهية تجمع بين الفراولة والخوخ، مع حلاوة الكراميل ولمسات ناعمة من المسك.',
                notes: { top: 'الفراولة والخوخ', heart: 'الكراميل', base: 'المسك والياسمين' },
                image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
                soldOut: false
            }
        ],

        // Salla Payment / Checkout links or Option IDs
        payUrls: {
            singleBase: 'https://core-saudi.com/ar/payment/p1977459513',
            singleVariants: {
                paradus: 'https://core-saudi.com/ar/payment/p1977459513',
                pandura: 'https://core-saudi.com/ar/payment/p1977459513?quantity=1&options%5B1816684164%5D=1914015896&options%5B1041663365%5D=434101914',
                ophira: 'https://core-saudi.com/ar/payment/p1977459513?quantity=1&options%5B1816684164%5D=1914015896&options%5B1041663365%5D=1166089444',
                camillia: 'https://core-saudi.com/ar/payment/p1977459513?quantity=1&options%5B1816684164%5D=1914015896&options%5B1041663365%5D=1022526953',
                solara: 'https://core-saudi.com/ar/payment/p1977459513?quantity=1&options%5B1816684164%5D=1914015896&options%5B1041663365%5D=1464928976'
            },
            duoBase: 'https://core-saudi.com/ar/payment/p225872003',
            duoVariants: {
                'ophira+pandura': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=1946841348&options%5B1562602420%5D=796307642',
                'camillia+pandura': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=1946841348&options%5B1562602420%5D=2035539899',
                'pandura+solara': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=1946841348&options%5B1562602420%5D=1262026372',
                'camillia+ophira': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=331202310&options%5B1562602420%5D=2035539899',
                'camillia+solara': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=1063779584&options%5B1562602420%5D=2035539899',
                'ophira+solara': 'https://core-saudi.com/ar/payment/p225872003?quantity=1&options%5B1196696525%5D=331202310&options%5B1562602420%5D=1262026372'
            }
        },

        quizQuestions: [
            {
                q: "وش نوع الروائح اللي تميل لها أكثر؟",
                a: [
                    ["ناعمة ومسكية", "pandura"],
                    ["منعشة وحمضية", "solara"],
                    ["فاكهية وحلوة", "camillia"],
                    ["شرقية وخشبية", "ophira"]
                ]
            },
            {
                q: "أي من هذي المكونات تحب تشمها في عطرك؟",
                a: [
                    ["الياسمين والورد", "pandura"],
                    ["الأناناس والحمضيات", "solara"],
                    ["الفراولة والكراميل", "camillia"],
                    ["الزعفران والعود", "ophira"]
                ]
            },
            {
                q: "هل فيه نوع من الروائح ما تفضّله؟",
                a: [
                    ["الروائح البودرية", "pandura"],
                    ["الروائح الحمضية", "solara"],
                    ["الروائح الحلوة والسكرية", "camillia"],
                    ["العود والروائح الشرقية", "ophira"],
                    ["ما عندي تفضيل معين", ""]
                ]
            }
        ],

        get selectedScent() {
            return this.scents.find(s => s.id === this.singleScent);
        },

        get canCheckout() {
            if (this.mode === 'single') return !!this.singleScent;
            return this.duoPicks.length === 2;
        },

        get checkoutButtonText() {
            if (this.mode === 'single') {
                return 'اشترِ الآن · 169 ر.س';
            }
            if (this.duoPicks.length === 2) {
                return 'اشترِ باقة الرائحتين · 204 ر.س';
            }
            return 'اختر رائحة ثانية لإكمال الباقة';
        },

        get checkoutUrl() {
            if (this.mode === 'single') {
                return this.payUrls.singleVariants[this.singleScent] || this.payUrls.singleBase;
            }
            const key = [...this.duoPicks].sort().join('+');
            return this.payUrls.duoVariants[key] || this.payUrls.duoBase;
        },

        setMode(m) {
            this.mode = m;
        },

        isSelected(id) {
            if (this.mode === 'single') return this.singleScent === id;
            return this.duoPicks.includes(id);
        },

        toggleDesc(id) {
            this.expandedDesc = this.expandedDesc === id ? null : id;
        },

        pickScent(id) {
            const item = this.scents.find(s => s.id === id);
            if (item && item.soldOut) return;

            if (this.mode === 'single') {
                this.singleScent = id;
            } else {
                if (this.duoPicks.includes(id)) {
                    this.duoPicks = this.duoPicks.filter(x => x !== id);
                } else {
                    if (this.duoPicks.length >= 2) {
                        this.duoPicks = [this.duoPicks[1], id];
                    } else {
                        this.duoPicks.push(id);
                    }
                }
            }
        },

        getScent(id) {
            return this.scents.find(s => s.id === id);
        },

        openQuiz() {
            this.showQuiz = true;
            this.quizStep = 0;
            this.quizAnswers = [];
            this.quizFinished = false;
        },

        closeQuiz() {
            this.showQuiz = false;
        },

        answerQuiz(val) {
            this.quizAnswers.push(val);
            if (this.quizStep + 1 < this.quizQuestions.length) {
                this.quizStep++;
            } else {
                this.calculateQuizResult();
            }
        },

        calculateQuizResult() {
            const ids = ['pandura', 'solara', 'camillia', 'ophira'];
            const pts = { pandura: 0, solara: 0, camillia: 0, ophira: 0 };
            const ans = this.quizAnswers;

            if (ans[0]) pts[ans[0]] += 3;
            if (ans[1]) pts[ans[1]] += 3;
            if (ans[2]) pts[ans[2]] -= 4;

            const sorted = [...ids].sort((a, b) => pts[b] - pts[a] || (a === ans[0] ? -1 : b === ans[0] ? 1 : 0));
            this.quizTopMatch = sorted[0];
            this.quizFinished = true;
        },

        applyQuizResult() {
            this.singleScent = this.quizTopMatch;
            this.mode = 'single';
            this.closeQuiz();
            const el = document.getElementById('featured');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        },

        resetQuiz() {
            this.quizStep = 0;
            this.quizAnswers = [];
            this.quizFinished = false;
        }
    }));
});
