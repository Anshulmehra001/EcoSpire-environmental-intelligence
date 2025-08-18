// Quick test for the AdvancedEWasteClassifier
import AdvancedEWasteClassifier from './src/utils/advancedEWasteClassifier.js';

console.log('Testing AdvancedEWasteClassifier...');

try {
    const classifier = new AdvancedEWasteClassifier();
    console.log('✅ Classifier created successfully');
    console.log('Stats:', classifier.getClassificationStats());
} catch (error) {
    console.error('❌ Classifier creation failed:', error);
}