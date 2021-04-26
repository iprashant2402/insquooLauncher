import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import {ScreenHeight} from '../../../utils/Dimensions';
import styles from './CodeScreen.styles';
import AddNewTask from './components/AddNewTask';
import Task from './components/Task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dark, light} from '../../../colors/colors';
import {getTasks, storeTasks} from '../../../utils/storage';

const sortByPriority = arr => {
  const high = [];
  const low = [];
  const medium = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].priority === 'high') {
      high.push(arr[i]);
    } else if (arr[i].priority === 'medium') {
      medium.push(arr[i]);
    } else {
      low.push(arr[i]);
    }
  }
  return [...high, ...medium, ...low];
};

const shouldGroupByPriority = (t1, t2) => {
  if (t1?.priority === t2?.priority) {
    return true;
  } else {
    return false;
  }
};

const CodeScreen = () => {
  const themeContext = React.useContext(ThemeContext);
  const {theme, updateTheme} = themeContext;
  const [activeTab, setActiveTab] = React.useState('tasks');
  const [newTaskModal, setNewTaskModal] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(null);
  const [newDesc, setNewDesc] = React.useState(null);
  const [newPriority, setNewPriority] = React.useState('medium');
  const [tasks, setTasks] = React.useState([]);

  const fetchTasksFromLocal = async () => {
    const res = await getTasks();
    if (res) {
      setTasks(res);
    } else {
      setTasks([]);
    }
  };

  React.useEffect(() => {
    fetchTasksFromLocal();
  }, []);

  const toggleTab = tab => {
    setActiveTab(tab);
  };

  const markAsComplete = index => {
    setTasks(prev => {
      const temp = prev.map((l, i) => {
        if (i === index) {
          l.isCompleted = !l.isCompleted;
        }
        return l;
      });
      storeTasks(temp);
      return temp;
    });
  };

  const createTask = () => {
    if (newTitle && newTitle !== '') {
      const temp = {
        title: newTitle,
        desc: newDesc,
        priority: newPriority,
        isCompleted: false,
      };
      setTasks(prev => {
        setNewDesc(null);
        setNewTitle(null);
        setNewTaskModal(false);
        const taskArr = [...prev, temp];
        const sortedArr = sortByPriority(taskArr);
        storeTasks(sortedArr);
        return sortedArr;
      });
    }
  };

  const deleteTask = i => {
    setTasks(prev => {
      prev[i].title = null;
      const temp = prev.filter(item => item.title !== null);
      storeTasks(temp);
      return temp;
    });
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' ? darkTheme.background : lightTheme.background,
        //newTaskModal && {opacity: 0.1}
      ]}>
      <View style={[styles.topBar, newTaskModal && {opacity: 0.2}]}>
        <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => toggleTab('tasks')}>
          <View>
            <Text
              style={[
                activeTab === 'tasks' ? styles.activeTab : styles.tab,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.primaryText,
              ]}>
              Todo list
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => toggleTab('notifications')}>
          <View>
            <Text
              style={[
                activeTab === 'notifications' ? styles.activeTab : styles.tab,
                theme === 'dark'
                  ? darkTheme.primaryText
                  : lightTheme.secondaryText,
              ]}>
              Notifications
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => setNewTaskModal(true)}>
          <View>
            <Ionicons
              name={'add'}
              size={ScreenHeight / 22}
              color={theme === 'dark' ? dark.primaryText : light.primaryText}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={[styles.taskList, newTaskModal && {opacity: 0.2}]}>
        {tasks.map((task, i) => (
          <Task
            theme={theme}
            onCompleted={() => markAsComplete(i)}
            title={task?.title}
            desc={task?.desc}
            priority={
              !shouldGroupByPriority(tasks[i], tasks[i - 1])
                ? task.priority
                : null
            }
            key={i}
            index={i}
            isCompleted={task?.isCompleted}
            onDelete={() => deleteTask(i)}
          />
        ))}
      </ScrollView>
      <AddNewTask
        modalVisible={newTaskModal}
        close={() => {
          setNewTitle(null);
          setNewDesc(null);
          setNewTaskModal(false);
        }}
        theme={theme}
        title={newTitle}
        desc={newDesc}
        priority={newPriority}
        onChangeDesc={text => setNewDesc(text)}
        onChangeTitle={text => setNewTitle(text)}
        onChangePriority={value => setNewPriority(value)}
        onSubmit={createTask}
      />
    </SafeAreaView>
  );
};

export default CodeScreen;
