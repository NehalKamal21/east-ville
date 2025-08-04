import React, { useState, useEffect } from 'react';
import { validatePanoramaImage } from '../utils/helpers';

const SpecificImageValidator: React.FC = () => {
  const [validationResult, setValidationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  const targetImage = '/panos/ClusterB/firstFloor/01.jpg';

  const validateSpecificImage = async () => {
    setLoading(true);
    try {
      const result = await validatePanoramaImage(targetImage);
      setValidationResult(result);
      
      // Also load the image to display it
      const img = new Image();
      img.onload = () => {
        setImageElement(img);
      };
      img.src = targetImage;
    } catch (error) {
      console.error('Validation error:', error);
      setValidationResult({
        isValid: false,
        issues: ['Validation failed'],
        dimensions: { width: 0, height: 0 }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSpecificImage();
  }, []);

  const getStatusIcon = (isValid: boolean) => {
    return isValid ? '✅' : '❌';
  };

  const getStatusColor = (isValid: boolean) => {
    return isValid ? 'text-success' : 'text-danger';
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Specific Image Validator - B-51 Master Bedroom 1</h3>
          <p className="text-muted">
            Validating the specific image causing black diamond issues: {targetImage}
          </p>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Validating image...</p>
            </div>
          )}

          {validationResult && (
            <div className="row">
              <div className="col-md-6">
                <h4>Validation Results</h4>
                <div className={`alert ${validationResult.isValid ? 'alert-success' : 'alert-danger'}`}>
                  <h5>
                    {getStatusIcon(validationResult.isValid)} 
                    Status: {validationResult.isValid ? 'Valid' : 'Invalid'}
                  </h5>
                  
                  <div className="mt-3">
                    <strong>Dimensions:</strong> {validationResult.dimensions.width} × {validationResult.dimensions.height}
                  </div>
                  
                  <div className="mt-2">
                    <strong>Aspect Ratio:</strong> {(validationResult.dimensions.width / validationResult.dimensions.height).toFixed(2)}:1
                  </div>

                  {validationResult.issues.length > 0 && (
                    <div className="mt-3">
                      <strong>Issues Found:</strong>
                      <ul className="mt-2">
                        {validationResult.issues.map((issue: string, index: number) => (
                          <li key={index} className="text-danger">{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h5>Recommendations:</h5>
                  <ul>
                    <li>Aspect ratio should be exactly 2:1 (width:height)</li>
                    <li>Minimum resolution: 2048×1024 pixels</li>
                    <li>Image should be in equirectangular projection</li>
                    <li>File should be in JPG format</li>
                    <li>Check for file corruption or incomplete upload</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <h4>Image Preview</h4>
                {imageElement && (
                  <div className="border rounded p-3">
                    <img 
                      src={targetImage} 
                      alt="Master Bedroom 1 Panorama"
                      className="img-fluid"
                      style={{ maxHeight: '300px', width: 'auto' }}
                    />
                    <div className="mt-2">
                      <small className="text-muted">
                        Displayed dimensions: {imageElement.naturalWidth} × {imageElement.naturalHeight}
                      </small>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <h5>Technical Details:</h5>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td><strong>File Path:</strong></td>
                        <td>{targetImage}</td>
                      </tr>
                      <tr>
                        <td><strong>Expected Format:</strong></td>
                        <td>Equirectangular Panorama</td>
                      </tr>
                      <tr>
                        <td><strong>Expected Aspect Ratio:</strong></td>
                        <td>2:1 (width:height)</td>
                      </tr>
                      <tr>
                        <td><strong>Recommended Resolution:</strong></td>
                        <td>2048×1024 or higher</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button 
              className="btn btn-primary"
              onClick={validateSpecificImage}
              disabled={loading}
            >
              {loading ? 'Validating...' : 'Re-validate Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificImageValidator; 