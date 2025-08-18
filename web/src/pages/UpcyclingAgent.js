import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import FeatureHeader from '../components/ui/FeatureHeader';
import ProcessFlow from '../components/ui/ProcessFlow';

const UpcyclingAgent = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const analyzeItem = async (file) => {
    setUploadedImage(file);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        itemType: getRandomItemType(),
        condition: getRandomCondition(),
        materials: getRandomMaterials(),
        upcyclingProjects: generateUpcyclingProjects(),
        difficulty: Math.floor(Math.random() * 3) + 1,
        estimatedTime: Math.floor(Math.random() * 120) + 30,
        toolsNeeded: getRandomTools()
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRandomItemType = () => {
    const items = ['Old T-Shirt', 'Broken Chair', 'Glass Jar', 'Cardboard Box', 'Plastic Bottle', 'Old Jeans', 'Wooden Pallet', 'Metal Can'];
    return items[Math.floor(Math.random() * items.length)];
  };

  const getRandomCondition = () => {
    const conditions = ['Good', 'Fair', 'Poor', 'Damaged'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getRandomMaterials = () => {
    const materials = [
      ['Cotton', 'Polyester'],
      ['Wood', 'Metal screws'],
      ['Glass', 'Metal lid'],
      ['Cardboard', 'Paper'],
      ['Plastic (PET)', 'Plastic cap'],
      ['Denim', 'Cotton thread'],
      ['Pine wood', 'Nails'],
      ['Aluminum', 'Paper label']
    ];
    return materials[Math.floor(Math.random() * materials.length)];
  };

  const getRandomTools = () => {
    const toolSets = [
      ['Scissors', 'Needle', 'Thread'],
      ['Screwdriver', 'Sandpaper', 'Paint brush'],
      ['Drill', 'Glass cutter', 'Glue'],
      ['Craft knife', 'Ruler', 'Glue stick'],
      ['Scissors', 'Hot glue gun', 'Markers'],
      ['Sewing machine', 'Fabric scissors', 'Pins'],
      ['Saw', 'Hammer', 'Measuring tape'],
      ['Can opener', 'Pliers', 'Wire cutters']
    ];
    return toolSets[Math.floor(Math.random() * toolSets.length)];
  };

  const generateUpcyclingProjects = () => {
    const projects = [
      {
        id: 1,
        title: 'Tote Bag',
        description: 'Transform old t-shirt into a reusable shopping bag',
        difficulty: 'Easy',
        time: '30 minutes',
        materials: ['Old t-shirt', 'Scissors'],
        steps: [
          'Cut off sleeves and neckline',
          'Turn inside out',
          'Tie bottom hem in knots',
          'Turn right side out'
        ]
      },
      {
        id: 2,
        title: 'Plant Pot',
        description: 'Convert container into decorative planter',
        difficulty: 'Medium',
        time: '45 minutes',
        materials: ['Container', 'Drill', 'Paint', 'Drainage stones'],
        steps: [
          'Clean container thoroughly',
          'Drill drainage holes in bottom',
          'Paint exterior if desired',
          'Add drainage layer and soil'
        ]
      },
      {
        id: 3,
        title: 'Storage Organizer',
        description: 'Create compartmentalized storage solution',
        difficulty: 'Hard',
        time: '90 minutes',
        materials: ['Box', 'Cardboard dividers', 'Fabric', 'Glue'],
        steps: [
          'Measure and cut dividers',
          'Create compartment layout',
          'Cover with fabric',
          'Assemble and secure'
        ]
      }
    ];
    
    return projects.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const selectProject = (project) => {
    setSelectedProject(project);
  };

  const processSteps = [
    {
      title: 'Upload Photo',
      description: 'Take a photo of your item',
      icon: '📸'
    },
    {
      title: 'AI Analysis',
      description: 'AI identifies materials and condition',
      icon: '🤖'
    },
    {
      title: 'Project Suggestions',
      description: 'Get personalized upcycling ideas',
      icon: '💡'
    },
    {
      title: 'Step-by-Step Guide',
      description: 'Follow detailed instructions',
      icon: '📋'
    }
  ];

  return (
    <div className="upcycling-agent">
      <FeatureHeader
        title="🔄 Upcycling Agent"
        subtitle="Creative Waste Transformation"
        description="AI-powered personalized repair and upcycling assistant for creative waste reduction"
      />

      <ProcessFlow steps={processSteps} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Item Analysis</h3>
          
          <FileUpload
            onFileSelect={analyzeItem}
            acceptedTypes="image/*"
            label="Upload photo of item to upcycle"
          />

          {uploadedImage && (
            <div className="mt-4">
              <img 
                src={URL.createObjectURL(uploadedImage)} 
                alt="Uploaded item" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {isAnalyzing && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing item...</p>
            </div>
          )}

          {analysis && (
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Item Identified: {analysis.itemType}</h4>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700">Condition:</span>
                    <span className="ml-1 font-medium">{analysis.condition}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Materials:</span>
                    <span className="ml-1 font-medium">{analysis.materials.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Upcycling Projects</h3>
          
          {analysis ? (
            <div className="space-y-3">
              {analysis.upcyclingProjects.map((project) => (
                <div 
                  key={project.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProject?.id === project.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => selectProject(project)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>⏱️ {project.time}</span>
                    <span>🔧 {project.materials.length} materials</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Upload an item photo to see upcycling suggestions
            </p>
          )}
        </Card>
      </div>

      {selectedProject && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Project Guide: {selectedProject.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Materials Needed</h4>
              <ul className="space-y-1">
                {selectedProject.materials.map((material, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">{material}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-medium mb-3 mt-6">Tools Required</h4>
              <ul className="space-y-1">
                {analysis.toolsNeeded.map((tool, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">🔧</span>
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Step-by-Step Instructions</h4>
              <ol className="space-y-3">
                {selectedProject.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Environmental Impact</h5>
                <div className="text-sm text-green-800 space-y-1">
                  <p>• Diverts 1 item from landfill</p>
                  <p>• Saves ~2kg CO₂ emissions</p>
                  <p>• Creates useful household item</p>
                  <p>• Estimated value: $15-25</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UpcyclingAgent;