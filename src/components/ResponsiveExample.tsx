import React from 'react';
import { useDeviceType, useIsMobile, useIsTablet, useIsDesktop, useScreenSize } from '../utils/hooks';

const ResponsiveExample: React.FC = () => {
  // Different ways to use the device detection hooks
  const deviceType = useDeviceType(); // Get the current device type
  const isMobile = useIsMobile(); // Check if mobile
  const isTablet = useIsTablet(); // Check if tablet
  const isDesktop = useIsDesktop(); // Check if desktop
  const { width, height } = useScreenSize(); // Get current screen dimensions

  return (
    <div style={{ padding: '20px' }}>
      <h2>Responsive Hook Examples</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Screen Size:</h3>
        <p>Width: {width}px, Height: {height}px</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Device Detection:</h3>
        <ul>
          <li>Current Device Type: <strong>{deviceType}</strong></li>
          <li>Is Mobile: {isMobile ? 'Yes' : 'No'}</li>
          <li>Is Tablet: {isTablet ? 'Yes' : 'No'}</li>
          <li>Is Desktop: {isDesktop ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Conditional Rendering Examples:</h3>
        
        {isMobile ? (
          <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '5px' }}>
            <p>📱 Mobile Layout - Optimized for touch interaction</p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#f3e5f5', padding: '10px', borderRadius: '5px' }}>
            <p>🖥️ Desktop Layout - Optimized for mouse interaction</p>
          </div>
        )}

        {deviceType === 'mobile' && (
          <div style={{ backgroundColor: '#fff3e0', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <p>📱 Mobile - Compact layout</p>
          </div>
        )}
      </div>

      <div>
        <h3>Usage in Different Components:</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
{`// In any component:
import { useDeviceType, useIsMobile, useIsTablet, useIsDesktop } from '../utils/hooks';

const MyComponent = () => {
  const deviceType = useDeviceType(); // 'mobile' | 'tablet' | 'desktop'
  const isMobile = useIsMobile(); // true if mobile
  const isTablet = useIsTablet(); // true if tablet
  const isDesktop = useIsDesktop(); // true if desktop

  return (
    <div>
      {deviceType === 'mobile' && <MobileLayout />}
      {deviceType === 'tablet' && <TabletLayout />}
      {deviceType === 'desktop' && <DesktopLayout />}
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default ResponsiveExample; 