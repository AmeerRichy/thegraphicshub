'use client'

import { useState } from 'react';

const faqData = [
  {
    category: 'General',
    items: [
      {
        question: 'What services do you offer?',
        answer: 'We provide a range of design services, including branding, UI/UX, logo design, interior & exterior design, animation, video editing, logo design & a lot more. Please visit our services for a complete list.',
      },
      {
        question: 'How do I place an order?',
        answer:
          'To place an order, please contact us through our website or via email. We will discuss your project requirements & provide a quote.',
      },
      {
        question: 'What information do you need to start a project?',
        answer: 'We typically require details about your project goals, preferences, timeline, & budget.',
      },
      {
        question: 'Do you offer revisions?',
        answer: 'Yes, we offer a set number of revisions based on the package you choose.',
      },
      {
        question: 'How long does it usually take to complete a project?',
        answer: 'The turnaround time for projects varies depending on the complexity & scope of the work. We will provide you with an estimated timeline when you place your order.',
      },
      {
        question: 'Do you work with international clients?',
        answer: 'Yes, we work with clients worldwide & ensure smooth communication through online platforms.',
      },
      {
        question: 'Can I request custom designs?',
        answer: 'Absolutely! We specialize in creating tailored designs to meet your unique needs.',
      },
      {
        question: 'What tools & software do you use?',
        answer: 'We use industry-standard tools like Adobe Creative Suite, Figma, & advanced AI tools for design creation.',
      },
       {
        question: 'What are your payment terms?',
        answer: 'Our payment terms typically involve a 50% upfront deposit, 25% upon delivery of the first draft, & the remaining 25% before final delivery. Please refer to our Terms & Conditions for more details.',
      },
       {
        question: 'Do you offer services other than graphics design?',
        answer: 'Yes, we do provide many other services. Please visit our website Wonder Works Digital for further information.',
      },
       {
        question: 'How can we contact you?',
        answer: 'You simply contact us via WhatsApp or via Email. You can also approach us on Fiverr.',
      },
    ],
  },
  {
    category: 'Design Services',
    items: [
      {
        question: 'Can you create a custom logo for my business?',
        answer: 'Yes, we can create a unique & memorable logo that reflects your brand identity.',
      },
      {
        question: 'Do you design logos for all industries?',
        answer: 'Yes, we create custom logos tailored to your brand identity, no matter the industry.',
      },
      {
        question: 'What is your process for logo design?',
        answer: 'Our process includes understanding your brand, brainstorming concepts, creating initial designs, & revising until you’re satisfied.',
      },
      {
        question: 'Do you offer branding services?',
        answer: 'Yes, we offer comprehensive branding services, including logo design, color palette selection, & brand messaging.',
      },
       {
        question: 'Do you create animated videos?',
        answer: 'Yes, we produce high-quality animated videos, including explainer videos, promotional content, & social media visuals.',
      },
       {
        question: 'Do you offer video editing services?',
        answer: 'Yes, we offer video editing services to enhance your existing footage & create professional-looking videos',
      },
       {
        question: 'Can you design social media content?',
        answer: 'Yes, we create eye-catching social media graphics, carousels, GIFs, & videos optimized for all platforms.',
      },
      {
        question: 'Do you offer 3D design services for interiors & exteriors?',
        answer: 'Yes, we provide realistic 3D designs for interior & exterior spaces, ideal for visualizing concepts.',
      },
      {
        question: 'Do you design websites as well or just UI/UX?',
        answer: 'We provide complete website services, including UI/UX design & development at Wonder Works Digital. ',
      },
      {
        question: 'Can I request a design inspired by another concept or style?',
        answer: 'Of course! Share your references or ideas, & we’ll create a design tailored to your preferences.',
      },
        {
        question: 'Can I get a combination of services in one project?',
        answer: 'Absolutely! We can bundle multiple services like logo design, branding, & videos into a cohesive project.',
      },
    ],
  },
   {
     category: 'AI Generated Designs', items:[
         {
        question: 'Do you offer AI-generated designs?',
        answer: 'Yes, we use advanced AI tools to create unique & high-quality designs tailored to your needs.',
      },
         {
        question: 'Which AI tool do you use very often?',
        answer: 'We prefer MidJourney, which is an AI-powered design tool that generates stunning visuals based on prompts. We leverage it to create innovative & artistic designs for our clients.',
      },
         {
        question: 'How do AI-generated designs compare to traditional designs?',
        answer: 'AI-generated designs are faster & cost-effective, offering creative ideas, while traditional designs provide a more detailed & personalized touch. We combine both approaches for the best results.',
      },
         {
        question: 'Can I provide specific prompts for AI-generated designs?',
        answer: 'Absolutely! You can share your ideas, & we’ll use them to create AI-generated visuals that align with your vision.',
      },
       {
        question: 'Do AI-generated designs include revisions?',
        answer: 'Yes, we offer revisions for AI-generated designs to ensure they meet your expectations.',
      },
       {
        question: 'Can AI-generated designs be used for branding & marketing?',
        answer: 'Yes, we can tailor AI-generated designs to fit your branding guidelines & marketing goals.',
      },
       {
        question: 'Can you integrate AI designs into other projects?',
        answer: 'Yes, we can seamlessly integrate AI-generated designs into larger projects like websites, branding, & print materials.',
      },
      
     ]
    },

    {
     category: 'Printing Services', items:[
         {
        question: 'Do you offer printing services?',
        answer: 'We do offer printing services for some services. Please contact us for pricing & availability.',
      },
         {
        question: 'What types of printing services do you offer?',
        answer: 'We offer a variety of printing services, including business & various other cards, flyers, brochures, & banners.',
      },
         {
        question: 'What happens if the product is printed & I need a revision?',
        answer: 'If the product has already been printed and revisions are requested, you will be charged for the revision. Additionally, you will be responsible for the cost of any wasted printed stock. We send a final draft for your approval before printing to ensure everything is correct.',
      },    
     ]
    },

    {
     category: 'Revisions', items:[
         {
        question: 'How many revisions are included in my project?',
        answer: 'We offer upto 5 rounds of revisions for each design. This includes changes to the design before final approval.',
      },
         {
        question: 'Are revisions free after design approval & delivery?',
        answer: 'Once the design is approved and the final files are delivered, revisions will not be free. Any changes requested after this point will incur additional charges depending on the changes required.',
      },
         {
        question: 'Can I request revisions after the first draft is delivered?',
        answer: 'Yes, you can request revisions after the first draft is delivered. However, once the final design is approved & delivered, no further free revisions will be offered.',
      },   
      {
        question: 'How are revision costs determined?',
        answer: 'The cost for revisions after design approval will depend on the complexity and scope of the changes. You will be informed of any additional costs before revisions begin.',
      },  
      {
        question: 'How do I request a revision?',
        answer: 'To request a revision, simply contact us via WhatsApp with your revision details. We will review the request & provide an estimate if necessary.',
      },   
     ]
    },

    {
     category: 'Privacy & Security', items:[
         {
        question: 'How do you protect my privacy?',
        answer: 'We take your privacy seriously & adhere to strict data protection standards. Please refer to our Privacy Policy for more information.',
      },
         {
        question: 'Is my personal information secure?',
        answer: 'We implement robust security measures to protect your personal information from unauthorized access or disclosure.',
      },  
     ]
    },

     {
     category: 'Payment', items:[
         {
        question: 'What payment methods do you accept?',
        answer: 'We accept payments through Xoom, Western Union, & other international services for global clients. For domestic clients, we accept direct bank transfer, JazzCash, Digit+, & other local payment methods.',
      },
         {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer payment plans based on the payment structure mentioned above. You can pay in installments as per the agreed milestones.',
      },  
          {
        question: 'Can I get a refund if I cancel my project?',
        answer: 'Refunds are based on the progress of your project. If you cancel before work begins, you will receive a full refund of the deposit, minus any transaction fees. If the project is in progress, partial refunds may apply. Please check Refund Policy for further details.',
      }, 
          {
        question: 'Are there any extra fees for international payments?',
        answer: 'For international payments, additional transaction fees may apply depending on the payment method used (e.g., Xoom, Western Union). Please check with your payment provider for any applicable fees.',
      }, 
          {
        question: 'Do you accept credit or debit card payments?',
        answer: 'Currently, we accept payments via Xoom, Western Union, bank transfer, and local services such as JazzCash and Digit+. Credit or debit card payments are not currently supported.',
      }, 
         {
        question: 'What happens if I miss a payment?',
        answer: 'If a payment is delayed, we reserve the right to pause or suspend the project until payment is received. Timely payments are essential to keep the project on track. Please feel free to check our Payment Policy for further information.',
      }, 
         {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use secure payment channels to ensure your information is safe. We never store your payment details.',
      }, 
     ]
    },
    
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<{ category: string; index: number } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleAnswer = (category: string, index: number) => {
    setOpenIndex(openIndex?.category === category && openIndex?.index === index ? null : { category, index });
  };

  // Load Arima font
  if (typeof document !== 'undefined' && !document.querySelector('link[href*="Arima"]')) {
    const linkTag = document.createElement('link');
    linkTag.href = 'https://fonts.googleapis.com/css2?family=Arima:wght@100;200;300;400;500;600;700&display=swap';
    linkTag.rel = 'stylesheet';
    document.head.appendChild(linkTag);
  }

  const renderPlusMinus = (isOpen: boolean) => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        position: 'relative',
        flexShrink: 0,
        background: isOpen ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.08)',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
      }}>
        {/* Horizontal line */}
        <div style={{
          position: 'absolute',
          width: '14px',
          height: '2px',
          background: '#ffd700',
          borderRadius: '1px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}></div>
        
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          width: '2px',
          height: '14px',
          background: '#ffd700',
          borderRadius: '1px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'scaleY(0) rotate(90deg)' : 'scaleY(1) rotate(0deg)',
          opacity: isOpen ? 0 : 1,
        }}></div>
      </div>
    );
  };

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Arima', cursive",
    }} className="py-40 px-4 sm:px-6 lg:px-8">
      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 215, 0, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 215, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.4,
      }}></div>

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 12s ease-in-out infinite',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 14s ease-in-out infinite reverse',
      }}></div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Premium Header */}
        {/* <div className="text-center mb-32">
          <div style={{
            display: 'inline-block',
            marginBottom: '20px',
          }}>
            <span style={{
              color: '#ffd700',
              fontSize: '12px',
              fontWeight: '900',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'block',
            }}>
              ✦ FAQ
            </span>
          </div>

          <h2 style={{
            color: 'white',
            fontSize: '64px',
            fontWeight: '900',
            margin: '0 0 16px 0',
            letterSpacing: '-1px',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Frequently Asked Questions
          </h2>

          <p style={{
            color: '#888',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '16px auto 0',
            fontWeight: '300',
          }}>
            Everything you need to know about our creative services
          </p>
        </div> */}

        {/* Main FAQ Container */}
        <div style={{ display: 'grid', gap: '32px' }}>
          {faqData.map((category, catIndex) => (
            <div key={catIndex} style={{ 
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(30, 30, 30, 0.4) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              borderRadius: '20px',
              padding: '40px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255, 215, 0, 0.2)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255, 215, 0, 0.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            >
              {/* Category Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '28px',
                paddingBottom: '20px',
                borderBottom: '2px solid rgba(255, 215, 0, 0.15)',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffd700, #ffd700)',
                }}></div>
                <h3 style={{
                  color: '#ffd700',
                  fontSize: '22px',
                  fontWeight: '800',
                  margin: 0,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  {category.category}
                </h3>
              </div>

              {/* FAQ Items */}
              <div style={{ display: 'grid', gap: '14px' }}>
                {category.items.map((faq, index) => {
                  const isOpen = openIndex?.category === category.category && openIndex?.index === index;
                  const itemId = `${category.category}-${index}`;

                  return (
                    <div key={index} style={{
                      borderRadius: '14px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}>
                      {/* Question Button */}
                      <button
                        onClick={() => toggleAnswer(category.category, index)}
                        onMouseEnter={() => setHoveredItem(itemId)}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                          width: '100%',
                          border: isOpen ? '2px solid #ffd700' : '2px solid rgba(255, 215, 0, 0.2)',
                          borderRadius: isOpen ? '14px 14px 0 0' : '14px',
                          background: isOpen 
                            ? 'rgba(255, 215, 0, 0.08)'
                            : hoveredItem === itemId
                            ? 'rgba(255, 215, 0, 0.04)'
                            : 'transparent',
                          padding: '22px 28px',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '16px',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          flex: 1,
                        }}>
                          {renderPlusMinus(isOpen)}
                          <span style={{
                            color: isOpen ? '#ffd700' : '#e0e0e0',
                            fontSize: '17px',
                            fontWeight: '700',
                            textAlign: 'left',
                            transition: 'color 0.3s ease',
                            letterSpacing: '0.2px',
                          }}>
                            {faq.question}
                          </span>
                        </div>
                      </button>

                      {/* Answer - Premium Expanded View */}
                      {isOpen && (
                        <div style={{
                          border: '2px solid #ffd700',
                          borderTop: '1px solid rgba(255, 215, 0, 0.3)',
                          borderRadius: '0 0 14px 14px',
                          marginTop: '-2px',
                          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.06) 0%, rgba(255, 215, 0, 0.02) 100%)',
                          overflow: 'hidden',
                          animation: 'slideDown 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}>
                          <div style={{
                            padding: '32px 28px',
                            position: 'relative',
                            display: 'flex',
                            gap: '20px',
                          }}>
                            {/* Thick left accent bar */}
                            <div style={{
                              width: '6px',
                              background: 'linear-gradient(180deg, #ffd700 0%, rgba(255, 215, 0, 0.5) 100%)',
                              borderRadius: '3px',
                              flexShrink: 0,
                              minHeight: '100%',
                              boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                            }}></div>

                            <div>
                              <p style={{
                                color: '#d0d0d0',
                                fontSize: '16px',
                                lineHeight: '1.8',
                                margin: '0',
                                fontWeight: '400',
                                letterSpacing: '0.3px',
                              }}>
                                {faq.answer.split('services').map((part, i) => (
                                  i === 0 ? part : (
                                    <span key={i}>
                                      <a href="#services" style={{
                                        color: '#ffd700',
                                        textDecoration: 'none',
                                        fontStyle: 'italic',
                                        fontWeight: '800',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                      }} 
                                      onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.textDecoration = 'underline';
                                        (e.target as HTMLElement).style.opacity = '0.8';
                                      }} 
                                      onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.textDecoration = 'none';
                                        (e.target as HTMLElement).style.opacity = '1';
                                      }}>
                                        services
                                      </a>
                                      {part}
                                    </span>
                                  )
                                ))}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div style={{
          marginTop: '64px',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffd700 100%)',
          padding: '56px 48px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(255, 215, 0, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2), transparent)',
            pointerEvents: 'none',
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              color: '#101010',
              fontSize: '16px',
              margin: '0 0 16px 0',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}>
              Still have questions?
            </p>
            <button
              style={{
                background: '#101010',
                color: '#ffd700',
                border: 'none',
                padding: '16px 48px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '900',
                cursor: 'pointer',
                letterSpacing: '1.5px',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                boxShadow: '0 8px 20px rgba(16, 16, 16, 0.3)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                (e.target as HTMLElement).style.boxShadow = '0 15px 40px rgba(16, 16, 16, 0.5)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(16, 16, 16, 0.3)';
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;