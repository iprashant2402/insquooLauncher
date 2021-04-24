import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {darkTheme, lightTheme} from '../../../colors/theme';
import {ThemeContext} from '../../../context/auth/ThemeContext';
import {ScreenHeight} from '../../../utils/Dimensions';
import styles from './CodeScreen.styles';
import AddNewTask from './components/AddNewTask';
import Task from './components/Task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dark, light} from '../../../colors/colors';

const CodeScreen = () => {
  const themeContext = React.useContext(ThemeContext);
  const {theme, updateTheme} = themeContext;
  const [activeTab, setActiveTab] = React.useState('tasks');
  const [newTaskModal, setNewTaskModal] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(null);
  const [newDesc, setNewDesc] = React.useState(null);
  const [newPriority, setNewPriority] = React.useState('medium');
  const [tasks, setTasks] = React.useState([]);
  const toggleTab = tab => {
    setActiveTab(tab);
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
        return [...prev, temp];
      });
    }
  };
  return (
    <View
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
            title={task.title}
            desc={task.desc}
            key={i}
            index={i}
            isCompleted={task.isCompleted}
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
        onChangeDesc={text => setNewDesc(text)}
        onChangeTitle={text => setNewTitle(text)}
        onSubmit={createTask}
      />
    </View>
  );
};

export default CodeScreen;
