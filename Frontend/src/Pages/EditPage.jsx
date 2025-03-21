import React, { useState, useEffect } from "react";
import { useServiceStore } from "../../Store/servicesStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";


function EditablePage() {
    const [headerText, setHeaderText] = useState("Transform Your Business with Digital Excellence");
    const [headerDescription, setHeaderDescription] = useState("Empower your organization with cutting-edge digital solutions tailored to your unique business needs. Start your transformation journey today.");
    const [headerImage, setHeaderImage] = useState("https://via.placeholder.com/1920x800");
    const [headerGradientOpacity, setHeaderGradientOpacity] = useState(0.8);
    const [headerTextColor, setHeaderTextColor] = useState("#ffffff");
    const [editingHeader, setEditingHeader] = useState(false);
    const [originalHeaderData, setOriginalHeaderData] = useState(null);
    const [originalAboutData, setOriginalAboutData] = useState(null);
    const [originalFeaturesData, setOriginalFeaturesData] = useState(null);
    const [originalHowItWorksData, setOriginalHowItWorksData] = useState(null);
    const [originalPricingData, setOriginalPricingData] = useState([]);


    const { id } = useParams()

    // About Us Section State
    const [aboutSection, setAboutSection] = useState({
        title: "About Our Digital Solutions",
        content: "We specialize in creating transformative digital experiences that drive business growth and customer engagement. Our team combines technical expertise with creative vision to deliver cutting-edge solutions.",
        image: "https://via.placeholder.com/600x400",
        editing: false
    });

    const [pricingCards, setPricingCards] = useState([
        {
            title: "Starter Plan",
            price: "$299/mo",
            description: "Perfect for startups and small businesses",
            features: [
                { text: "Up to 10 users" },
                { text: "Basic analytics dashboard" },
                { text: "Email support" }
            ]
        },
        {
            title: "Professional Plan",
            price: "$799/mo",
            description: "Advanced features for growing enterprises",
            features: [
                { text: "Up to 50 users" },
                { text: "Advanced analytics" },
                { text: "Priority support" },
                { text: "API access" }
            ]
        },
        {
            title: "Enterprise Plan",
            price: "Custom",
            description: "Tailored solutions for large organizations",
            features: [
                { text: "Unlimited users" },
                { text: "Custom integrations" },
                { text: "24/7 dedicated support" },
                { text: "Personalized onboarding" }
            ]
        }
    ]);

    const [editingPricing, setEditingPricing] = useState(false);

    // Features Section State
    const [featuresSection, setFeaturesSection] = useState({
        title: "Powerful Features for Modern Businesses",
        content: "Discover how our comprehensive suite of tools can revolutionize your operations and customer engagement.",
        features: [
            { text: "Cloud-based Infrastructure" },
            { text: "Real-time Analytics" },
            { text: "AI-powered Insights" },
            { text: "Secure API Integrations" }
        ],
        image: "https://via.placeholder.com/600x400",
        editing: false
    });

    // How It Works Section State
    const [howItWorksSection, setHowItWorksSection] = useState({
        title: "How We Drive Your Digital Success",
        description: "A simple three-step process to transform your business",
        steps: [
            {
                title: "Discovery & Planning",
                content: "We analyze your business needs and create a customized digital roadmap"
            },
            {
                title: "Implementation & Integration",
                content: "Our experts deploy solutions while ensuring seamless system integration"
            },
            {
                title: "Optimization & Growth",
                content: "Continuous improvement and scaling to ensure long-term success"
            }
        ],
        editing: false
    });

    const {
        getPageData,
        loading,
        saveHeaderData,
        isInitialized,
        sendAboutUsData,
        sendFeaturesData,
        sendHowItWorksData,
        sendPricingData,
        initializeServicePage,
        pageIsInitialized,
        servicePage: pageData = null
    } = useServiceStore();


    useEffect(() => {
        if (!pageIsInitialized) {
            initializeServicePage(id);
        }
    }, [pageIsInitialized, initializeServicePage, id]);


    useEffect(() => {
        if (pageIsInitialized && !isInitialized) {
            getPageData(id);
        }
    }, [pageIsInitialized, isInitialized, getPageData, id]);


    useEffect(() => {
        if (pageData) {
            if (pageData.header) {
                setHeaderText(pageData.header.text);
                setHeaderDescription(pageData.header.description);
                setHeaderImage(pageData.header.image?.url || "https://via.placeholder.com/1920x800");
                setHeaderGradientOpacity(pageData.header.gradientOpacity);
                setHeaderTextColor(pageData.header.textColor);
            }
            if (pageData.about) {
                setAboutSection(prev => ({
                    ...prev,
                    title: pageData.about.title,
                    content: pageData.about.content,
                    image: pageData.about.image?.url || "https://via.placeholder.com/600x400"
                }));
            }
            if (pageData.features) {
                setFeaturesSection(prev => ({
                    ...prev,
                    title: pageData.features.title,
                    content: pageData.features.content,
                    features: pageData.features.features,
                    image: pageData.features.image?.url || "https://via.placeholder.com/600x400"
                }));
            }
            if (pageData.howItWorks) {
                setHowItWorksSection(prev => ({
                    ...prev,
                    title: pageData.howItWorks.title,
                    description: pageData.howItWorks.description,
                    steps: pageData.howItWorks.steps
                }));
            }
            if (pageData.pricing?.cards) {
                setPricingCards(pageData.pricing.cards);
            }
        }
    }, [pageData]);

    const handleCancelHeader = () => {
        if (originalHeaderData) {
            setHeaderText(originalHeaderData.text);
            setHeaderDescription(originalHeaderData.description);
            setHeaderImage(originalHeaderData.image);
            setHeaderGradientOpacity(originalHeaderData.gradientOpacity);
            setHeaderTextColor(originalHeaderData.textColor);
        }
        setEditingHeader(false);
    };

    const handleCancelAbout = () => {
        if (originalAboutData) {
            setAboutSection({ ...originalAboutData, editing: false });
        }
    };

    const handleCancelFeatures = () => {
        if (originalFeaturesData) {
            setFeaturesSection({ ...originalFeaturesData, editing: false });
        }
    };

    const handleCancelHowItWorks = () => {
        if (originalHowItWorksData) {
            setHowItWorksSection({ ...originalHowItWorksData, editing: false });
        }
    };

    const handleCancelPricing = () => {
        setPricingCards([...originalPricingData]);
        setEditingPricing(false);
    };


    const handleImageUpload = (event, callback) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updatePricingCard = (index, field, value) => {
        const newCards = [...pricingCards];
        newCards[index][field] = value;
        setPricingCards(newCards);
    };

    const updatePricingCardFeature = (cardIndex, featureIndex, value) => {
        const newCards = [...pricingCards];
        newCards[cardIndex].features[featureIndex].text = value;
        setPricingCards(newCards);
    };

    const deletePricingCardFeature = (cardIndex, featureIndex) => {
        const newCards = [...pricingCards];
        newCards[cardIndex].features.splice(featureIndex, 1);
        setPricingCards(newCards);
    };

    // Features Section Helpers
    const updateFeature = (index, value) => {
        const newFeatures = [...featuresSection.features];
        newFeatures[index].text = value;
        setFeaturesSection(prev => ({ ...prev, features: newFeatures }));
    };

    // Add How It Works handlers
    const updateHowItWorksStep = (index, field, value) => {
        const newSteps = [...howItWorksSection.steps];
        newSteps[index][field] = value;
        setHowItWorksSection(prev => ({ ...prev, steps: newSteps }));
    };

    // Helper function to identify image type
    const identifyImageType = (imageSource) => {
        if (imageSource && imageSource.startsWith('data:image')) {
            return { type: 'base64Image', value: imageSource };
        } else {
            return { type: 'imageUrl', value: imageSource };
        }
    };

    // Save Handlers
    const handleSaveHeader = async () => {
        const imageData = identifyImageType(headerImage);

        const headerData = {
            text: headerText,
            description: headerDescription,
            [imageData.type]: imageData.value,
            gradientOpacity: headerGradientOpacity,
            textColor: headerTextColor
        };
        await saveHeaderData(headerData, id)

        console.log('Header Section Data:', headerData);
    };

    const handleSaveAbout = async () => {
        const imageData = identifyImageType(aboutSection.image);

        const aboutData = {
            title: aboutSection.title,
            content: aboutSection.content,
            [imageData.type]: imageData.value
        };
        sendAboutUsData(aboutData, id)
        console.log('About Section Data:', aboutData);
    };

    const handleSavePricing = async () => {
        const pricingData = pricingCards.map(card => ({
            title: card.title,
            price: card.price,
            description: card.description,
            features: card.features.map(f => f.text)
        }));

        // Assuming you have a store action like sendPricingData
        await sendPricingData(pricingData, id)
        console.log('All Pricing Data:', pricingData);
        setEditingPricing(false);
    };
    const handleSaveFeatures = async () => {
        const imageData = identifyImageType(featuresSection.image);

        const featuresData = {
            title: featuresSection.title,
            content: featuresSection.content,
            [imageData.type]: imageData.value,
            features: featuresSection.features.map(f => f.text)
        };
        await sendFeaturesData(featuresData, id)

        console.log('Features Section Data:', featuresData);
    };

    const handleSaveHowItWorks = async () => {
        await sendHowItWorksData(howItWorksSection, id)
        console.log('How It Works Data:', howItWorksSection);

    };

    if (loading)
        return (
            <LoadingSpinner></LoadingSpinner>
        )

    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden">
            {/* Hero Section */}
            <section className={`relative ${editingHeader ? 'h-[100vh]' : 'h-[90vh] md:h-[90vh]'} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={headerImage}
                        alt="Background"
                        className="w-full h-full object-cover transform scale-105"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900"
                        style={{ opacity: headerGradientOpacity }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_100%)]" />
                </div>

                <div className="relative max-w-7xl px-4 sm:px-6 text-center space-y-10 py-8">
                    <div className="space-y-8">
                        {editingHeader ? (
                            <div className="space-y-4">
                                <input
                                    value={headerText}
                                    onChange={(e) => setHeaderText(e.target.value)}
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold bg-transparent border-b-2 border-white/50 text-center focus:outline-none w-full max-w-[95%] mx-auto leading-tight tracking-tight"
                                    style={{ color: headerTextColor }}
                                />
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <span className="text-white text-sm sm:text-base">Text Color:</span>
                                    <input
                                        type="color"
                                        value={headerTextColor}
                                        onChange={(e) => setHeaderTextColor(e.target.value)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        ) : (
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl font-bold px-2 leading-tight tracking-tight -mt-20"
                                style={{ color: headerTextColor }}
                            >
                                {headerText}
                            </h1>
                        )}

                        {editingHeader ? (
                            <div className="max-w-2xl mx-auto px-2">
                                <textarea
                                    value={headerDescription}
                                    onChange={(e) => setHeaderDescription(e.target.value.slice(0, 150))}
                                    className="text-lg sm:text-xl md:text-xl text-white/90 bg-transparent border-b-2 border-white/50 text-center focus:outline-none w-full font-light"
                                    rows="2"
                                    maxLength={150}
                                />
                                <p className="text-white/70 text-xs sm:text-sm mt-1">
                                    {headerDescription.length}/150 characters
                                </p>
                            </div>
                        ) : (
                            <p className="text-lg sm:text-xl md:text-xl text-white/90 max-w-2xl mx-auto px-2 font-light">
                                {headerDescription}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-5 px-2 pt-4">
                        {editingHeader ? (
                            <>
                                <button
                                    onClick={handleSaveHeader}
                                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg font-semibold"
                                >
                                    Save Header
                                </button>
                                <button
                                    onClick={handleCancelHeader}
                                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg font-semibold"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    setOriginalHeaderData({
                                        text: headerText,
                                        description: headerDescription,
                                        image: headerImage,
                                        gradientOpacity: headerGradientOpacity,
                                        textColor: headerTextColor
                                    });
                                    setEditingHeader(true);
                                }}
                                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg font-semibold"
                            >
                                Edit Header
                            </button>
                        )}
                        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg font-semibold">
                            Get Started
                        </button>
                    </div>

                    {editingHeader && (
                        <div className="mt-8 space-y-6 px-2">
                            <div className="space-y-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setHeaderImage)}
                                    className="w-[95%] sm:w-4/5 md:w-1/2 mx-auto p-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                                />
                                <p className="text-white/70 text-center text-sm">Or enter image URL:</p>
                                <input
                                    type="text"
                                    value={headerImage}
                                    onChange={(e) => setHeaderImage(e.target.value)}
                                    className="w-[95%] sm:w-4/5 md:w-1/2 mx-auto p-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 text-white">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm sm:text-base">Gradient Opacity:</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={headerGradientOpacity}
                                        onChange={(e) => setHeaderGradientOpacity(parseFloat(e.target.value))}
                                        className="w-24 sm:w-32 accent-white"
                                    />
                                    <span className="text-sm sm:text-base">{(headerGradientOpacity * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Abstract shapes */}
                {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-white">
                        <path fill="currentColor" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                        <path fill="currentColor" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                        <path fill="currentColor" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
                    </svg>
                </div> */}
            </section>

            {/* Floating Stats Section
                <section className="relative z-10 -mt-16 mb-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { number: "98%", text: "Customer satisfaction" },
                                { number: "24/7", text: "Expert support" },
                                { number: "10k+", text: "Active businesses" }
                            ].map((stat, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-4xl font-bold text-indigo-600">{stat.number}</h3>
                                            <p className="text-gray-600 mt-2">{stat.text}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

            {/* About Us Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-50 translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8 order-2 md:order-1">
                        <div className="inline-block mb-3">
                            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                                About Us
                            </span>
                        </div>
                        <div className="space-y-8">
                            {aboutSection.editing ? (
                                <div className="space-y-6">
                                    <input
                                        value={aboutSection.title}
                                        onChange={(e) => setAboutSection(prev => ({ ...prev, title: e.target.value }))}
                                        className="text-4xl md:text-5xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none w-full"
                                    />
                                    <textarea
                                        value={aboutSection.content}
                                        onChange={(e) => setAboutSection(prev => ({ ...prev, content: e.target.value }))}
                                        className="text-lg text-gray-600 w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <div className="space-y-6 mt-6">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, (value) =>
                                                setAboutSection(prev => ({ ...prev, image: value })))
                                            }
                                            className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <p className="text-gray-500 text-sm text-center">Or enter image URL:</p>
                                        <input
                                            type="text"
                                            value={aboutSection.image}
                                            onChange={(e) => setAboutSection(prev => ({ ...prev, image: e.target.value }))}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter image URL"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                        {aboutSection.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                        {aboutSection.content}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            {aboutSection.editing ? (
                                <>
                                    <button
                                        onClick={handleSaveAbout}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancelAbout}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setOriginalAboutData({ ...aboutSection });
                                        setAboutSection(prev => ({ ...prev, editing: true }));
                                    }}
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Edit Section
                                </button>
                            )}
                            <button className="bg-indigo-100 text-indigo-900 px-8 py-4 rounded-full hover:bg-indigo-200 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative group order-1 md:order-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <img
                            src={aboutSection.image}
                            alt="About Us"
                            className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full -z-10"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-100 rounded-full -z-10"></div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
                <div className="max-w-7xl mx-auto px-6 space-y-16">
                    <div className="text-center space-y-6">
                        <div className="inline-block mb-3">
                            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                                Our Process
                            </span>
                        </div>
                        <div className="space-y-6">
                            {howItWorksSection.editing ? (
                                <div className="space-y-6">
                                    <input
                                        value={howItWorksSection.title}
                                        onChange={(e) => setHowItWorksSection((prev) => ({ ...prev, title: e.target.value }))}
                                        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent border-b-2 border-indigo-300 focus:outline-none w-full max-w-2xl mx-auto text-center pb-2"
                                    />
                                    <textarea
                                        value={howItWorksSection.description}
                                        onChange={(e) => setHowItWorksSection((prev) => ({ ...prev, description: e.target.value }))}
                                        className="text-lg text-gray-600 w-full max-w-2xl mx-auto p-4 border-2 border-dashed rounded-xl focus:ring-2 focus:ring-indigo-300 text-center leading-relaxed"
                                        rows="2"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        {howItWorksSection.title}
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                        {howItWorksSection.description}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center">
                            {howItWorksSection.editing ? (
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSaveHowItWorks}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancelHowItWorks}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setOriginalHowItWorksData({ ...howItWorksSection });
                                        setHowItWorksSection((prev) => ({ ...prev, editing: true }));
                                    }}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                                >
                                    Customize Section
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-200 -translate-y-1/2 transform"></div>
                        <div className="grid md:grid-cols-3 gap-12 items-start relative z-10">
                            {howItWorksSection.steps.map((step, index) => (
                                <div key={index} className="relative flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl mb-8 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                        <span className="text-white font-bold">{index + 1}</span>
                                    </div>
                                    <div className="space-y-6 bg-white p-8 rounded-2xl w-full border border-gray-100 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                                        {howItWorksSection.editing ? (
                                            <>
                                                <input
                                                    value={step.title}
                                                    onChange={(e) => updateHowItWorksStep(index, "title", e.target.value)}
                                                    className="text-2xl font-bold bg-transparent border-b-2 border-gray-200 focus:border-indigo-600 focus:outline-none text-center w-full pb-2 placeholder-gray-400"
                                                    placeholder={`Step ${index + 1} Title`}
                                                />
                                                <textarea
                                                    value={step.content}
                                                    onChange={(e) => updateHowItWorksStep(index, "content", e.target.value)}
                                                    className="text-gray-600 w-full p-4 border-2 border-dashed rounded-xl focus:ring-2 focus:ring-indigo-300 text-center bg-white/50 leading-relaxed placeholder-gray-400"
                                                    rows="3"
                                                    placeholder="Describe this step..."
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{step.content}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-50 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200 rounded-full opacity-50 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <img
                            src={featuresSection.image}
                            alt="Features"
                            className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 w-full"
                        />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full -z-10"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-full -z-10"></div>
                    </div>
                    <div className="space-y-8">
                        <div className="inline-block mb-3">
                            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                                Features
                            </span>
                        </div>
                        <div className="space-y-8">
                            {featuresSection.editing ? (
                                <div className="space-y-6">
                                    <input
                                        value={featuresSection.title}
                                        onChange={(e) => setFeaturesSection((prev) => ({ ...prev, title: e.target.value }))}
                                        className="text-4xl md:text-5xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none w-full"
                                    />
                                    <textarea
                                        value={featuresSection.content}
                                        onChange={(e) => setFeaturesSection((prev) => ({ ...prev, content: e.target.value }))}
                                        className="text-lg text-gray-600 w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, (value) =>
                                            setFeaturesSection(prev => ({ ...prev, image: value })))
                                        }
                                        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <p className="text-gray-500 text-sm text-center">Or enter image URL:</p>
                                    <input
                                        type="text"
                                        value={featuresSection.image}
                                        onChange={(e) => setFeaturesSection(prev => ({ ...prev, image: e.target.value }))}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter image URL"
                                    />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Features List</h3>
                                        <ul className="space-y-3">
                                            {featuresSection.features.map((feature, index) => (
                                                <li key={index} className="flex items-center space-x-3">
                                                    <input
                                                        value={feature.text}
                                                        onChange={(e) => updateFeature(index, e.target.value)}
                                                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const newFeatures = [...featuresSection.features];
                                                            newFeatures.splice(index, 1);
                                                            setFeaturesSection((prev) => ({ ...prev, features: newFeatures }));
                                                        }}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => {
                                                setFeaturesSection((prev) => ({
                                                    ...prev,
                                                    features: [
                                                        ...prev.features,
                                                        { text: "New Feature", editing: false },
                                                    ],
                                                }));
                                            }}
                                            className="w-full text-indigo-900 hover:text-indigo-800 font-medium"
                                        >
                                            + Add Feature
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                        {featuresSection.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                        {featuresSection.content}
                                    </p>
                                    <ul className="space-y-6">
                                        {featuresSection.features.map((feature, index) => (
                                            <li key={index} className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="text-xl text-gray-800 font-medium">{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            {featuresSection.editing ? (
                                <>
                                    <button
                                        onClick={handleSaveFeatures}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancelFeatures}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setOriginalFeaturesData({ ...featuresSection });
                                        setFeaturesSection((prev) => ({ ...prev, editing: true }));
                                    }}
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Edit Section
                                </button>
                            )}
                            <button className="bg-indigo-100 text-indigo-900 px-8 py-4 rounded-full hover:bg-indigo-200 transition-colors">
                                View All Features
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 -translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-50 translate-y-1/3 translate-x-1/3 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
                    <div className="text-center space-y-6">
                        <div className="inline-block mb-3">
                            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                                Pricing Plans
                            </span>
                        </div>
                        <div className="flex justify-center gap-4">
                            {editingPricing ? (
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSavePricing}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Save Pricing
                                    </button>
                                    <button
                                        onClick={handleCancelPricing}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setOriginalPricingData([...pricingCards]);
                                        setEditingPricing(true);
                                    }}
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Edit Pricing
                                </button>
                            )}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the perfect plan for your business needs</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingCards.map((card, cardIndex) => (
                            <div
                                key={cardIndex}
                                className={`relative bg-white rounded-3xl ${card.highlighted ? 'shadow-2xl ring-4 ring-indigo-500/20' : 'shadow-xl'} p-8 transition-all hover:shadow-2xl group`}
                            >
                                {card.highlighted && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        {editingPricing ? (
                                            <>
                                                <input
                                                    value={card.title}
                                                    onChange={(e) => updatePricingCard(cardIndex, "title", e.target.value)}
                                                    className={`text-2xl font-bold ${card.highlighted ? 'text-indigo-700' : 'text-gray-900'} border-b-2 border-indigo-500 focus:outline-none w-full`}
                                                />
                                                <div className="flex items-end">
                                                    <input
                                                        value={card.price.split('/')[0]}
                                                        onChange={(e) => updatePricingCard(cardIndex, "price", e.target.value + "/mo")}
                                                        className={`text-5xl font-extrabold ${card.highlighted ? 'text-indigo-700' : 'text-gray-900'} border-b-2 border-indigo-500 focus:outline-none w-full`}
                                                    />
                                                    <span className="text-gray-500 ml-1 mb-1">/mo</span>
                                                </div>
                                                <textarea
                                                    value={card.description}
                                                    onChange={(e) => updatePricingCard(cardIndex, "description", e.target.value)}
                                                    className="text-gray-600 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    rows="2"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h3 className={`text-2xl font-bold ${card.highlighted ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                    {card.title}
                                                </h3>
                                                <div className="flex items-end">
                                                    <p className={`text-5xl font-extrabold ${card.highlighted ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                        {card.price.split('/')[0]}
                                                    </p>
                                                    <span className="text-gray-500 ml-1 mb-1">/mo</span>
                                                </div>
                                                <p className="text-gray-600 pb-4">{card.description}</p>
                                            </>
                                        )}
                                        <div className={`w-full h-px ${card.highlighted ? 'bg-indigo-100' : 'bg-gray-100'}`}></div>
                                    </div>

                                    <ul className="space-y-4">
                                        {card.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start space-x-3">
                                                {editingPricing ? (
                                                    <>
                                                        <input
                                                            value={feature.text}
                                                            onChange={(e) => updatePricingCardFeature(cardIndex, featureIndex, e.target.value)}
                                                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                        <button
                                                            onClick={() => deletePricingCardFeature(cardIndex, featureIndex)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            className={`w-6 h-6 mt-0.5 flex-shrink-0 ${card.highlighted ? 'text-indigo-500' : 'text-indigo-400'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-600">{feature.text}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    {editingPricing && (
                                        <button
                                            onClick={() => {
                                                const newCards = [...pricingCards];
                                                newCards[cardIndex].features.push({
                                                    text: "New Feature"
                                                });
                                                setPricingCards(newCards);
                                            }}
                                            className="w-full text-indigo-900 hover:text-indigo-800 font-medium py-2 border-2 border-dashed rounded-lg"
                                        >
                                            + Add Feature
                                        </button>
                                    )}

                                    <button
                                        className={`w-full py-4 rounded-full text-center font-medium transition-all ${card.highlighted
                                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                            }`}
                                    >
                                        Select {card.title}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                            Join thousands of satisfied customers who've already revolutionized their operations with our solutions.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button className="px-10 py-5 bg-white text-indigo-900 rounded-full text-xl font-bold shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Get Service
                        </button>
                    </div>
                </div>

                <div className="absolute -top-24 left-0 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 right-0 w-72 h-72 bg-indigo-700/20 rounded-full blur-3xl"></div>
            </section>
        </div>
    );
}

export default EditablePage;