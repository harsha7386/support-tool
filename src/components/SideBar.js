const SideBar = ({ onCustomerClick }) => {
  const customers = ['Harsha Reddy', 'Vishu', 'Aditya', 'Sai'];

  // Generate a color from the customer name (simple hash function)
  const getColorForName = (name) => {
    const colors = ['#e57373', '#81c784', '#64b5f6', '#ffd54f', '#ba68c8', '#4db6ac', '#ff8a65'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img
          src="https://www.sprinklr.com/favicon.ico"
          alt="Sprinklr Logo"
          style={{ width: '30px', height: '30px' }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Sprinklr</span>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {customers.map((name, index) => {
          const initial = name.charAt(0);
          const circleColor = getColorForName(name);
          return (
            <li
              key={index}
              className="customer-name"
              onClick={() => onCustomerClick(name)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div
                style={{
                  backgroundColor: circleColor,
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                  marginLeft: '15px',
                }}
              >
                {initial}
              </div>
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
