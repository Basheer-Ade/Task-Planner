import AsyncStorage from '@react-native-async-storage/async-storage';

const PLANNER_KEY = 'plannerTasks';

export const fetchTasks = async () => {
  try {
    const storedData = await AsyncStorage.getItem(PLANNER_KEY);

    if (storedData) {
      return JSON.parse(storedData);
    }

    return [];
  } catch (error) {
    console.log('Unable to load planner tasks:', error);
    return [];
  }
};

export const storeTasks = async (taskList) => {
  try {
    await AsyncStorage.setItem(
      PLANNER_KEY,
      JSON.stringify(taskList)
    );
  } catch (error) {
    console.log('Unable to save planner tasks:', error);
  }
};

export const clearAllTasks = async () => {
  try {
    await AsyncStorage.removeItem(PLANNER_KEY);
  } catch (error) {
    console.log('Unable to clear tasks:', error);
  }
};