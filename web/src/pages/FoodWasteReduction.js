import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import FeatureHeader from '../components/ui/FeatureHeader';
import ProblemSolutionCard from '../components/ui/ProblemSolutionCard';
import ProcessFlow from '../components/ui/ProcessFlow';
import ImpactMetrics from '../components/ui/ImpactMetrics';
import ActionButton from '../components/ui/ActionButton';

const FoodWasteReduction = () => {
  const [userType, setUserType] = useState('consumer');
  const [location, setLocation] = useState('');
  const [availableFood, setAvailableFood] = useState([]);
  const [impactStats, setImpactStats] = useState({ meals: 0, co2: 0, money: 0 });

  useEffect(() => {
    loadAvailableFood();
    loadImpactStats();
  }, []);

  const loadAvailableFood = () => {
    const mockFood = [
      {
        id: 1,
        business: 'Green Valley Grocery',
        type: 'Grocery Store',
        items: ['Fresh produce mix', 'Bakery items', 'Dairy products'],
        quantity: '50 lbs',
        originalPrice: 125,
        discountedPrice: 25,
        expiryTime: '2 hours',
        distance: 0.8,
        category: 'Mixed',
        pickupTime: '6:00 PM - 8:00 PM',
        allergens: ['Dairy', 'Gluten'],
        photo: null,
        urgency: 'high'
      },
      {
        id: 2,
        business: 'Bella Vista Restaurant',
        type: 'Restaurant',
        items: ['Prepared meals', 'Fresh salads', 'Soup portions'],
        quantity: '20 portions',
        originalPrice: 200,
        discountedPrice: 40,
        expiryTime: '1 hour',
        distance: 1.2,
        category: 'Prepared Food',
        pickupTime: '9:00 PM - 10:00 PM',
        allergens: ['Nuts'],
        photo: null,
        urgency: 'critical'
      },
      {
        id: 3,
        business: 'Corner Bakery',
        type: 'Bakery',
        items: ['Day-old bread', 'Pastries', 'Sandwiches'],
        quantity: '30 items',
        originalPrice: 90,
        discountedPrice: 18,
        expiryTime: '4 hours',
        distance: 0.5,
        category: 'Baked Goods',
        pickupTime: 'End of day'
      }
    ];
    
    setAvailableFood(mockFood);
  };

  const loadImpactStats = () => {
    const saved = localStorage.getItem('foodWasteImpact');
    if (saved) {
      setImpactStats(JSON.parse(saved));
    }
  };

  const saveImpact = (meals, co2, money) => {
    const newStats = {
      meals: impactStats.meals + meals,
      co2: impactStats.co2 + co2,
      money: impactStats.money + money
    };
    setImpactStats(newStats);
    localStorage.setItem('foodWasteImpact', JSON.stringify(newStats));
  };

  const claimFood = async (foodItem) => {
    const mealsProvided = parseInt(foodItem.quantity);
    const co2Saved = mealsProvided * 2.5; // kg CO2 per meal
    const moneySaved = foodItem.originalPrice - foodItem.discountedPrice;
    
    saveImpact(mealsProvided, co2Saved, moneySaved);
    
    // Remove from available food
    setAvailableFood(prev => prev.filter(item => item.id !== foodItem.id));
    
    // Log activity for dashboard
    try {
      const { authManager } = await import('../utils/auth');
      await authManager.logActivity('Food rescue completed', {
        business: foodItem.business,
        quantity: foodItem.quantity,
        co2Saved: co2Saved,
        moneySaved: moneySaved,
        mealsProvided: mealsProvided
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
    }
    
    alert(`Great! You've claimed ${foodItem.quantity} from ${foodItem.business}. Check your impact stats!`);
  };

  const getUrgencyColor = (time) => {
    const hours = parseInt(time);
    if (hours <= 1) return 'text-red-600 bg-red-100';
    if (hours <= 3) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Mixed': return '🥗';
      case 'Prepared Food': return '🍽️';
      case 'Baked Goods': return '🥖';
      default: return '🍎';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <FeatureHeader
        icon="🍽️"
        title="Food Rescue Network: Zero Waste"
        subtitle="AI-powered surplus food redistribution platform connecting businesses, consumers, and charities"
        capabilities="🤖 Smart Matching • 📊 Impact Tracking • 🌍 Community Network • ⚡ Real-time Updates"
      />

      {/* Problem Statement */}
      <ProblemSolutionCard
        type="problem"
        title="The Food Waste Crisis"
        content="40% of food in the US is wasted while 38 million people face food insecurity. Businesses throw away perfectly good food daily because there's no efficient way to connect surplus with need."
        highlights={[
          '80 billion pounds of food wasted annually in the US',
          '$1,500 worth of food wasted per household per year',
          'Food waste generates 58% more greenhouse gases than landfills',
          'No real-time platform connecting surplus food with communities'
        ]}
      />

      {/* Solution */}
      <ProblemSolutionCard
        type="solution"
        title="The Food Rescue Revolution"
        content="Turn food waste into community wealth. Our AI-powered platform instantly connects businesses with surplus food to consumers and charities, creating a real-time food rescue network that reduces waste and feeds communities."
        color="#4CAF50"
      />

      {/* Process Flow */}
      <ProcessFlow
        title="How Food Rescue Works"
        steps={[
          {
            icon: '🏪',
            title: 'List Surplus',
            description: 'Businesses list excess food with photos and details'
          },
          {
            icon: '🤖',
            title: 'Smart Match',
            description: 'AI matches food with nearby consumers and charities'
          },
          {
            icon: '📱',
            title: 'Quick Pickup',
            description: 'Real-time notifications and pickup coordination'
          },
          {
            icon: '📊',
            title: 'Track Impact',
            description: 'Measure environmental and social impact'
          }
        ]}
      />

      {/* Impact Dashboard */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🌱 Your Food Rescue Impact
        </h3>
        <ImpactMetrics
          metrics={[
            {
              icon: '🍽️',
              value: impactStats.meals,
              label: 'Meals Rescued',
              color: '#4CAF50',
              description: 'Meals provided to community'
            },
            {
              icon: '🌍',
              value: impactStats.co2.toFixed(1),
              label: 'CO₂ Prevented',
              color: '#2196F3',
              unit: ' kg',
              description: 'Carbon emissions avoided'
            },
            {
              icon: '💰',
              value: impactStats.money,
              label: 'Money Saved',
              color: '#FF9800',
              unit: '',
              description: 'Community savings generated'
            }
          ]}
        />
      </div>

      {/* User Type Selection */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>👤 I am a...</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <button
            onClick={() => setUserType('consumer')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'consumer' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'consumer' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛒</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Consumer</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Looking for discounted surplus food</div>
          </button>
          
          <button
            onClick={() => setUserType('business')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'business' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'business' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏪</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Business</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Have surplus food to redistribute</div>
          </button>
          
          <button
            onClick={() => setUserType('charity')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'charity' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'charity' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>❤️</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Food Bank/Charity</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Collecting food for community distribution</div>
          </button>
        </div>
      </div>

      {/* Location Input */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📍 Your Location</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <MapPin style={{ height: '20px', width: '20px', color: '#666' }} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your address or zip code"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '2px solid #4CAF50'
            }}
          />
          <button
            style={{
              padding: '12px 24px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔍 Find Food
          </button>
        </div>
      </div>

      {userType === 'consumer' && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🍽️ Available Food Near You</h3>
          
          {availableFood.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🍽️</div>
              <p>No food available right now</p>
              <p style={{ fontSize: '0.9rem' }}>Check back later or expand your search area</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {availableFood.map((food) => (
                <div key={food.id} style={{
                  border: `3px solid ${getUrgencyColor(food.expiryTime).includes('red') ? '#f44336' : getUrgencyColor(food.expiryTime).includes('orange') ? '#FF9800' : '#4CAF50'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  background: '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{food.business}</h4>
                      <p style={{ color: '#666' }}>{food.type} • {food.distance} miles away</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{getCategoryIcon(food.category)}</div>
                      <span style={{
                        background: getUrgencyColor(food.expiryTime).includes('red') ? '#f44336' : getUrgencyColor(food.expiryTime).includes('orange') ? '#FF9800' : '#4CAF50',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {food.expiryTime} left
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                    <div>
                      <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Items Available</h5>
                      <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {food.items.map((item, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%', marginRight: '8px' }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>Quantity:</span>
                          <span style={{ fontWeight: 'bold' }}>{food.quantity}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>Original Price:</span>
                          <span style={{ textDecoration: 'line-through', color: '#999' }}>${food.originalPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>Your Price:</span>
                          <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>${food.discountedPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Pickup Time:</span>
                          <span style={{ fontWeight: 'bold' }}>{food.pickupTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center' }}>
                      <Clock style={{ height: '16px', width: '16px', marginRight: '5px' }} />
                      Expires in {food.expiryTime}
                    </div>
                    <ActionButton
                      onClick={() => claimFood(food)}
                      icon="🚀"
                    >
                      Claim Food
                    </ActionButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {userType === 'business' && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🏪 List Your Surplus Food</h3>
          
          <form style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Business Name
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="Your business name"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Business Type
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: '2px solid #4CAF50'
                }}>
                  <option>Restaurant</option>
                  <option>Grocery Store</option>
                  <option>Bakery</option>
                  <option>Catering</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                Food Description
              </label>
              <textarea
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: '2px solid #4CAF50',
                  minHeight: '80px'
                }}
                placeholder="Describe the food items available..."
              ></textarea>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Quantity
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="e.g., 20 portions, 10 lbs"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Original Value ($)
                </label>
                <input
                  type="number"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="0"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Asking Price ($)
                </label>
                <input
                  type="number"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Pickup Time
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="e.g., 6:00 PM - 8:00 PM"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  Expires In
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: '2px solid #4CAF50'
                }}>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>End of day</option>
                  <option>Tomorrow</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚀 List Food for Rescue
            </button>
          </form>
        </div>
      )}

      {userType === 'charity' && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>❤️ Bulk Food Collection</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Register Your Organization</h4>
              <form style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="Organization name"
                />
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                  }}
                  placeholder="Tax ID / Registration number"
                />
                <textarea
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50',
                    minHeight: '80px'
                  }}
                  placeholder="Describe your mission and food distribution capacity..."
                ></textarea>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  🏛️ Register Organization
                </button>
              </form>
            </div>
            
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Available for Bulk Collection</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h5 style={{ fontWeight: 'bold', margin: 0 }}>Metro Grocery Chain</h5>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: '2px 0' }}>5 locations</p>
                    </div>
                    <span style={{
                      background: '#e8f5e8',
                      color: '#2E7D32',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Daily
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Mixed produce, dairy, and bakery items</p>
                  <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Est. 200-300 lbs/day</p>
                </div>
                
                <div style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h5 style={{ fontWeight: 'bold', margin: 0 }}>University Dining Services</h5>
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: '2px 0' }}>Campus cafeterias</p>
                    </div>
                    <span style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Weekly
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Prepared meals and fresh ingredients</p>
                  <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Est. 500-800 portions/week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodWasteReduction;