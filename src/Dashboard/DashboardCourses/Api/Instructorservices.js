import axios from 'axios';


export const checkInstructorExists = async (instructorName) => {
  try {
    const response = await axios.get(`http://educationtraining.runasp.net/api/Instructor`);
    const instructors = response.data;
    
    const foundInstructor = instructors.find(
      instructor => instructor.name.toLowerCase() === instructorName.toLowerCase()
    );
    
    return foundInstructor ? true : false;
  } catch (error) {
    console.error('Error checking instructor:', error);
    return false;
  }
};