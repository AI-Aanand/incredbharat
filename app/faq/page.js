import { Metadata } from 'next';

export const metadata = {
    title: 'FAQ - Frequently Asked Questions | IncredBharat',
    description: 'Find answers to common questions about booking tour packages, payment, cancellations, and more on IncredBharat.',
};

export default function FAQPage() {
    const faqs = [
        {
            category: 'Booking & Reservations',
            questions: [
                {
                    q: 'How do I book a tour package?',
                    a: 'Click on any package to view details, then click "Enquire Now" or "Book Now". Fill in your details and our partner tour operators will contact you within 24 hours to confirm your booking.'
                },
                {
                    q: 'Can I customize a package?',
                    a: 'Yes! Most packages can be customized based on your preferences. When you submit an inquiry, mention your customization requirements, and the tour operator will provide you with a tailored itinerary and quote.'
                },
                {
                    q: 'How far in advance should I book?',
                    a: 'We recommend booking at least 2-4 weeks in advance for domestic tours and 6-8 weeks for special tours like Lakshadweep or Northeast circuits. During peak seasons (October-March), book even earlier for better availability.'
                },
                {
                    q: 'Is there a booking fee on IncredBharat?',
                    a: 'No! IncredBharat is a free tour aggregator platform. You only pay the package price to the tour operator. We don\'t charge any booking or service fees.'
                }
            ]
        },
        {
            category: 'Payment & Pricing',
            questions: [
                {
                    q: 'What payment methods are accepted?',
                    a: 'Payment methods vary by tour operator. Most accept bank transfers, UPI, credit/debit cards, and online payment gateways. The operator will provide payment details after confirming your booking.'
                },
                {
                    q: 'Are the prices shown final?',
                    a: 'Prices shown are starting prices and may vary based on seasonality, hotel category, group size, and customizations. The final price will be confirmed by the tour operator.'
                },
                {
                    q: 'Do you offer EMI options?',
                    a: 'Many tour operators offer EMI payment options for packages above ₹20,000. Please confirm with the operator when booking.'
                },
                {
                    q: 'Are there any hidden charges?',
                    a: 'All package inclusions and exclusions are clearly mentioned. Common exclusions include personal expenses, meals not mentioned, monument entry fees (unless specified), and travel insurance. Always check the package details carefully.'
                }
            ]
        },
        {
            category: 'Cancellation & Refunds',
            questions: [
                {
                    q: 'What is the cancellation policy?',
                    a: 'Cancellation policies vary by operator and package type. Typically: 30+ days before departure: 10-25% cancellation fee; 15-30 days: 25-50% fee; 7-15 days: 50-75% fee; Less than 7 days: Non-refundable. Always check the specific policy before booking.'
                },
                {
                    q: 'How do I cancel my booking?',
                    a: 'Contact the tour operator directly using the contact details they provided when confirming your booking. IncredBharat is an aggregator and cannot process cancellations directly.'
                },
                {
                    q: 'Can I get a full refund?',
                    a: 'Full refunds are rare and typically only available if the tour operator cancels the trip due to unforeseen circumstances. If you cancel, refund amounts depend on the cancellation timeline and policy.'
                },
                {
                    q: 'What if the operator cancels the tour?',
                    a: 'If the operator cancels your tour, you are entitled to a full refund. The operator should inform you immediately and process the refund within 7-14 business days.'
                }
            ]
        },
        {
            category: 'Travel & Safety',
            questions: [
                {
                    q: 'Do I need travel insurance?',
                    a: 'Travel insurance is highly recommended, especially for adventure tours, hill stations, and remote destinations. It covers medical emergencies, trip cancellations, and lost luggage. Some packages include basic insurance.'
                },
                {
                    q: 'What documents do I need to carry?',
                    a: 'Always carry: Valid government-issued photo ID (Aadhar, Passport, Driving License), booking confirmation, travel insurance (if purchased), any permits (provided by operator for places like Lakshadweep, Arunachal Pradesh), and vaccination certificates if required.'
                },
                {
                    q: 'Are the tours safe for solo travelers?',
                    a: 'Yes! Many packages welcome solo travelers. Some operators offer women-only group tours for added safety. Always inform the operator if you\'re traveling solo.'
                },
                {
                    q: 'What COVID-19 precautions are in place?',
                    a: 'Tour operators follow government guidelines including sanitization, social distancing, and health checks. Requirements may vary by destination. Check current guidelines before travel.'
                }
            ]
        },
        {
            category: 'Using IncredBharat',
            questions: [
                {
                    q: 'How do I search for packages?',
                    a: 'Use the search bar to find packages by destination, state, or activity. You can also browse by clicking on states in the interactive India map or use filters on the packages page to narrow down by budget, duration, and type.'
                },
                {
                    q: 'How do I save packages for later?',
                    a: 'Click the heart icon on any package card to add it to your favorites. Access your saved packages anytime from the "Favorites" menu in the navigation bar.'
                },
                {
                    q: 'What do the package badges mean?',
                    a: 'Package badges indicate: 🚂 IRCTC (Rail Tourism), 🚌 State Road Transport, 🏛️ State Tourism Department, 💰 Government Subsidized packages with special pricing for seniors, students, or differently-abled travelers.'
                },
                {
                    q: 'Can I compare different packages?',
                    a: 'Yes! You can open multiple package detail pages in different tabs to compare prices, itineraries, and inclusions side-by-side.'
                }
            ]
        },
        {
            category: 'Special Packages',
            questions: [
                {
                    q: 'What are subsidized packages?',
                    a: 'These are government-supported tours with reduced prices for senior citizens (60+), students, women groups, or differently-abled travelers. Eligibility proof is required at booking.'
                },
                {
                    q: 'Do you have group tour options?',
                    a: 'Yes! Many packages are designed for groups and offer group discounts. Typical group sizes range from 10-40 people. Contact the operator for group pricing.'
                },
                {
                    q: 'Are there packages for senior citizens?',
                    a: 'Absolutely! Look for packages marked with the subsidized badge. Many state tourism boards offer senior citizen discounts (10-30% off). Medical fitness may be required for adventure tours.'
                },
                {
                    q: 'Can I book a honeymoon package?',
                    a: 'Yes! Popular honeymoon destinations include Kerala, Goa, Andaman, Sikkim, Kashmir, and Meghalaya. Filter by "Romantic" or "Beach" categories, or contact operators to customize a romantic itinerary.'
                }
            ]
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Frequently Asked Questions
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>
                    Everything you need to know about booking and traveling with IncredBharat
                </p>
            </div>

            {/* FAQ Sections */}
            {faqs.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '1.875rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        color: '#000080',
                        borderBottom: '3px solid #FF9933',
                        paddingBottom: '0.5rem',
                        display: 'inline-block'
                    }}>
                        {section.category}
                    </h2>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {section.questions.map((item, qIdx) => (
                            <div
                                key={qIdx}
                                className="card"
                                style={{ padding: '2rem' }}
                            >
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    color: '#111827',
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                }}>
                                    <span style={{
                                        color: '#FF9933',
                                        marginRight: '0.75rem',
                                        fontSize: '1.5rem',
                                        fontWeight: 800
                                    }}>
                                        Q.
                                    </span>
                                    {item.q}
                                </h3>
                                <p style={{
                                    fontSize: '1.05rem',
                                    lineHeight: 1.7,
                                    color: '#4b5563',
                                    marginLeft: '2.5rem'
                                }}>
                                    <span style={{
                                        color: '#138808',
                                        fontWeight: 700,
                                        marginRight: '0.5rem'
                                    }}>
                                        A:
                                    </span>
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Contact Section */}
            <div style={{
                marginTop: '5rem',
                padding: '3rem',
                background: 'linear-gradient(135deg, #FFF5E6 0%, #E8F5E9 100%)',
                borderRadius: '1rem',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#000080' }}>
                    Still have questions?
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
                    Can't find the answer you're looking for? Reach out to us directly.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                        href="mailto:support@incredbharat.in"
                        className="btn btn-primary"
                        style={{ minWidth: '200px' }}
                    >
                        Email Us
                    </a>
                    <a
                        href="/about"
                        className="btn btn-outline"
                        style={{ minWidth: '200px' }}
                    >
                        Learn More About Us
                    </a>
                </div>
            </div>
        </div>
    );
}
