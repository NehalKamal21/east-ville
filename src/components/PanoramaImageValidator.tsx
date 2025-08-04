import React, { useState, useEffect } from 'react';
import { validatePanoramaImages } from '../utils/helpers';

interface ValidationResult {
  path: string;
  isValid: boolean;
  issues: string[];
  dimensions: { width: number; height: number };
}

const PanoramaImageValidator: React.FC = () => {
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate paths for all 360Ext images (A through M)
  const generate360ExtPaths = () => {
    const letters = 'ABCDEFGHIJKLM'.split('');
    return letters.map(letter => `/360Ext/${letter}.jpg`);
  };

  // Generate paths for all panorama images from panoData
  const generatePanoramaPaths = () => {
    const paths: string[] = [];
    
    // Add paths from panoData structure
    const clusters = ['ClusterA', 'ClusterB', 'ClusterTW'];
    const floors = ['groundFloor', 'firstFloor', 'secondFloor', 'Roof'];
    
    clusters.forEach(cluster => {
      floors.forEach(floor => {
        // This would need to be updated based on actual panoData structure
        // For now, we'll use a pattern based on the existing structure
        for (let i = 1; i <= 10; i++) {
          const path = `/panos/${cluster}/${floor}/${i.toString().padStart(2, '0')}.jpg`;
          paths.push(path);
        }
      });
    });
    
    return paths;
  };

  const validateAllImages = async () => {
    setLoading(true);
    setShowResults(false);

    try {
      const allPaths = [
        ...generate360ExtPaths(),
        ...generatePanoramaPaths()
      ];

      const { valid, invalid } = await validatePanoramaImages(allPaths);
      
      // Convert results to ValidationResult format
      const validationResults: ValidationResult[] = [];
      
      valid.forEach(path => {
        validationResults.push({
          path,
          isValid: true,
          issues: [],
          dimensions: { width: 0, height: 0 } // Would need to be filled from actual validation
        });
      });
      
      invalid.forEach(item => {
        validationResults.push({
          path: item.path,
          isValid: false,
          issues: item.issues,
          dimensions: { width: 0, height: 0 }
        });
      });

      setResults(validationResults);
      setShowResults(true);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isValid: boolean) => {
    return isValid ? 'text-success' : 'text-danger';
  };

  const getStatusIcon = (isValid: boolean) => {
    return isValid ? '✅' : '❌';
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Panorama Image Validator</h3>
          <p className="text-muted">
            This tool validates all panorama images to identify issues that may cause black diamonds.
          </p>
        </div>
        <div className="card-body">
          <button
            className="btn btn-primary"
            onClick={validateAllImages}
            disabled={loading}
          >
            {loading ? 'Validating...' : 'Validate All Images'}
          </button>

          {showResults && (
            <div className="mt-4">
              <h4>Validation Results</h4>
              
              <div className="row">
                <div className="col-md-6">
                  <h5>Valid Images ({results.filter(r => r.isValid).length})</h5>
                  <ul className="list-group">
                    {results.filter(r => r.isValid).map((result, index) => (
                      <li key={index} className="list-group-item list-group-item-success">
                        {getStatusIcon(result.isValid)} {result.path}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="col-md-6">
                  <h5>Invalid Images ({results.filter(r => !r.isValid).length})</h5>
                  <ul className="list-group">
                    {results.filter(r => !r.isValid).map((result, index) => (
                      <li key={index} className="list-group-item list-group-item-danger">
                        <div>
                          {getStatusIcon(result.isValid)} {result.path}
                        </div>
                        <ul className="mt-2 mb-0">
                          {result.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="small text-muted">
                              • {issue}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {results.filter(r => !r.isValid).length > 0 && (
                <div className="alert alert-warning mt-3">
                  <h5>Recommendations to Fix Black Diamond Issues:</h5>
                  <ul>
                    <li>Ensure all images have a 2:1 aspect ratio (width:height)</li>
                    <li>Use equirectangular projection format</li>
                    <li>Minimum resolution: 2048x1024 pixels</li>
                    <li>Check for corrupted or incomplete image files</li>
                    <li>Verify all images are in JPG format</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanoramaImageValidator; 