import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  CircularProgress
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import ReactPlayer from "react-player";
import moment from "moment";
import axios from "axios";
import Apiconfigs from "../../../Apiconfig/Apiconfigs";
import Loader from "../../../component/Loader";
import { motion } from "framer-motion";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  playerContainer: {
    flex: 2,
    minWidth: 0, // Prevent flex item from overflowing
  },
  lessonsContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      maxHeight: 'none',
    },
  },
  mediaContainer: {
    width: '100%',
    height: '550px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: '250px',
    },
  },
  lessonCard: {
    width:"100%",
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: theme.shadows[4],
    },
  },
  lessonMedia: {
    height: '120px',
  },
  activeLesson: {
    border: `2px solid rgb(191, 0, 255)`,
  },
  contentSection: {
    marginTop: theme.spacing(2),
    color: "white"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  quizDialog: {
    minWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
  quizTitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  questionCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#4a148c',
    '&:hover': {
      backgroundColor: '#7b1fa2',
    },
  },
  resultContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 200, 0, 0.1)',
    borderRadius: '8px',
  },
}));


const mockQuiz = {
  title: "Lesson Quiz",
  questions: [
    {
      text: "What is the main topic of this lesson?",
      options: [
        "Introduction to React",
        "State management",
        "Component lifecycle",
        "All of the above"
      ],
      correctAnswer: 0
    },
    {
      text: "Which hook is used for side effects?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      text: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Syntax",
        "JavaScript Execute"
      ],
      correctAnswer: 0
    }
  ]
};

const Lesson = () => {
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for the current lesson being viewed
  const [currentLesson, setCurrentLesson] = useState(location.state?.lessonData || null);
  
  // State for all lessons in the course
  const [allLessons, setAllLessons] = useState([]);
  
  // State for course details
  const [courseDetails, setCourseDetails] = useState(location.state?.courseDetails || null);
  
  const [isSubscribed, setIsSubscribed] = useState(location.state?.isSubscribed || false);
  const [loading, setLoading] = useState(!location.state?.lessonData);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const [quizOpen, setQuizOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);


 useEffect(() => {
  // 1. Cache key for lesson data
  const lessonCacheKey = `lessonData_${id}`;
  const lessonsCacheKey = `allLessons_${location.state?.courseDetails?._id || courseDetails?._id}`;

  // 2. Check if lesson data is passed via state or cached
  if (!location.state?.lessonData) {
    // Check if cached lesson data exists
    const cachedLesson = sessionStorage.getItem(lessonCacheKey);
    if (cachedLesson) {
      setCurrentLesson(JSON.parse(cachedLesson)); // Use cached data
    } else {
      // Fetch lesson data from API if not cached
      const fetchLessonData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${Apiconfigs.mynft2}${id}`);
          if (res.data.statusCode === 200) {
            setCurrentLesson(res.data.result);
            // Cache the lesson data
            sessionStorage.setItem(lessonCacheKey, JSON.stringify(res.data.result));
          }
        } catch (error) {
          console.error("Error fetching lesson:", error);
          navigate('/error');
        } finally {
          setLoading(false);
        }
      };
      fetchLessonData();
    }
  }

  // 3. Fetch all lessons for the course
  const fetchAllLessons = async () => {
    // Check if cached all lessons data exists
    const cachedLessons = sessionStorage.getItem(lessonsCacheKey);
    if (cachedLessons) {
      setAllLessons(JSON.parse(cachedLessons)); // Use cached data
    } else {
      // Fetch lessons from API if not cached
      try {
        setLoadingLessons(true);
        const res = await axios.get(Apiconfigs.courseContentList, {
          params: {
            nft2Id: location.state?.courseDetails?._id || courseDetails?._id,
          },
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        
        if (res.data.statusCode === 200) {
          setAllLessons(res.data.result.docs);
          // Cache the lessons data
          sessionStorage.setItem(lessonsCacheKey, JSON.stringify(res.data.result.docs));

          // If we didn't get lessonData from state, set the first lesson as current
          if (!location.state?.lessonData && res.data.result.docs.length > 0) {
            setCurrentLesson(res.data.result.docs[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoadingLessons(false);
      }
    }
  };

  fetchAllLessons();

}, [id, location.state, navigate, courseDetails]);


  const handleVideo = (url) => {
    if (!url || typeof url !== "string") return false;
    const videoFormats = ["mp4", "avi", "wmv", "mov", "mkv", "flv", "webm", "mpeg", "3gp", "ogv"];
    const extension = url.split('.').pop().split('?')[0].toLowerCase();
    return videoFormats.includes(extension);
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    // Update URL without navigation
    navigate(`/lesson/${lesson._id}`, { 
      replace: true,
      state: { 
        lessonData: lesson,
        courseDetails: courseDetails,
        isSubscribed: isSubscribed
      } 
    });
  };

  useEffect(() => {
    if (quizOpen) {
      const initialAnswers = {};
      mockQuiz.questions.forEach((q, i) => {
        initialAnswers[`q${i}`] = null;
      });
      setUserAnswers(initialAnswers);
      setQuizSubmitted(false);
      setScore(0);
    }
  }, [quizOpen]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [`q${questionIndex}`]: answerIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    mockQuiz.questions.forEach((question, qIndex) => {
      if (userAnswers[`q${qIndex}`] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  const handleRetryQuiz = () => {
    initializeQuiz();
  };

  const handleCloseQuiz = () => {
    setQuizOpen(false);
  };

  const initializeQuiz = () => {
    const initialAnswers = {};
    mockQuiz.questions.forEach((q, i) => {
      initialAnswers[`q${i}`] = null;
    });
    setUserAnswers(initialAnswers);
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleOpenQuiz = () => {
    initializeQuiz();
    setQuizOpen(true);
  };



  if (loading) return <Loader />;
  if (!currentLesson) return <Typography variant="h4">Lesson not found</Typography>;

  return (
    <Box className={classes.root} sx={{
      background: (theme) => theme.custom.PageBackGround,
    }}>
      <Box className={classes.container}>
        {/* Main Player and Current Lesson Info */}
        <Box className={classes.playerContainer}>
          <Box className={classes.mediaContainer}>
            {handleVideo(currentLesson?.mediaUrl) ? (
              <ReactPlayer
                url={currentLesson.mediaUrl}
                playing
                controls
                width="100%"
                height="100%"
                muted
              />
            ) : (
              <img
                src={currentLesson?.mediaUrl}
                alt={currentLesson?.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            )}
          </Box>
          
          <Box sx={{
            backgroundColor: "rgb(117, 0, 125)",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
            <Box display="flex" justifyContent="space-between" alignItems='center' mb={2}>
              <Typography variant="h2" color="white">
                 {currentLesson?.details || "No details provided."}
              </Typography>
              <Typography variant="h3" color="white">
                {currentLesson?.createdAt && moment(currentLesson.createdAt).format("MMM Do YYYY")}
              </Typography>
            </Box>
            
           
            
            <Box display="flex" flexWrap="wrap" justifyContent='space-between'>
            <Typography variant="h3" paragraph color="white" mb={3}>
            {currentLesson?.title || "No Title Available"}
            </Typography>
              <Chip 
                label={currentLesson?.postType || "PUBLIC"} 
                className={classes.chip}
                color={currentLesson?.postType === "PRIVATE" ? "secondary" : "primary"}
                sx={{
                  color: "white",
                  backgroundColor: "rgb(66, 0, 92)",
                  '&:hover': {
                    backgroundColor: "rgb(86, 0, 120)",
                  }
                }}
              />
            </Box>
            <Box mt={2} display='flex' justifyContent="space-between">
          <Button 
            variant="contained"
            sx={{
              color: "white",
              fontSize:"18px",
              backgroundColor: "rgb(66, 0, 92)",
              '&:hover': {
                backgroundColor: "rgb(86, 0, 120)",
              }
            }}
            onClick={() => navigate(-1)}
          >
            Back to Course
          </Button>

        <Button 
        component={motion.button}
          variant="contained" 
          onClick={handleOpenQuiz}
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          sx={{
            color: "white",
            fontSize:"18px",
              backgroundColor: "rgb(66, 0, 92)",
              '&:hover': {
                backgroundColor: "rgb(86, 0, 120)",
              }
          }}
        >
          Take Lesson Quiz
        </Button>
      </Box>
          </Box>
         
        </Box>
        
        {/* Lessons List */}
        <Box className={classes.lessonsContainer}>
          <Typography variant="h5" gutterBottom color="white">
            Course Lessons ({allLessons.length})
          </Typography>
          
          {loadingLessons ? (
            <Loader />
          ) : allLessons.length === 0 ? (
            <Typography variant="body1" color="white">
              No lessons available in this course.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {allLessons.map((lesson) => (
                <Grid item xs={12} key={lesson._id}>
                  <Card 
                    className={`${classes.lessonCard} ${
                      currentLesson._id === lesson._id ? classes.activeLesson : ''
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <Box display="flex" sx={{background:"rgb(117, 0, 125)" }}>
                      <Box>
                        {handleVideo(lesson.mediaUrl) ? (
                          <ReactPlayer
                            url={lesson.mediaUrl}
                            width="150px"
                            height="100%"
                            
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            className={classes.lessonMedia}
                            image={lesson.mediaUrl}
                            alt={lesson.title}
                          />
                        )}
                      </Box>
                      <Box>
                      <CardContent style={{ flex: 1 }}>
                        <Typography variant="subtitle1" noWrap color="white">
                           {lesson.details}
                        </Typography>
                        <Typography variant="body2" color="white">
                          {moment(lesson.createdAt).format("MMM Do YYYY")}
                        </Typography>
                        <Typography variant="body2" color="white" noWrap>
                        {lesson.title}
                        </Typography>
                      </CardContent>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>


      <Dialog
        open={quizOpen}
        onClose={handleCloseQuiz}
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.quizDialog }}
        disableScrollLock
      >
        <DialogTitle sx={{fontSize:"20px"}}>Lesson Quiz</DialogTitle>
        <DialogContent dividers>
          {mockQuiz.questions.map((question, qIndex) => (
            <Box key={qIndex} mb={4}>
              <Typography variant="h4" gutterBottom>
                {qIndex + 1}. {question.text}
              </Typography>
              
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={userAnswers[`q${qIndex}`] ?? ''}
                  onChange={(e) => handleAnswerSelect(qIndex, parseInt(e.target.value))}
                  disabled={quizSubmitted}
                >
                  {question.options.map((option, oIndex) => (
                    <FormControlLabel
                      key={oIndex}
                      value={oIndex}
                      control={<Radio />}
                      label={option}
                      sx={{
                        marginBottom: 1,
                        borderRadius: 1,
                        backgroundColor: quizSubmitted 
                          ? oIndex === question.correctAnswer 
                            ? 'rgba(0, 200, 0, 0.1)'
                            : userAnswers[`q${qIndex}`] === oIndex 
                              ? 'rgba(200, 0, 0, 0.1)'
                              : 'transparent'
                          : 'transparent',
                        padding: 1,
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}

          {quizSubmitted && (
            <Box className={classes.resultContainer}>
              <Typography variant="h6">
                Your score: {score} out of {mockQuiz.questions.length}
              </Typography>
              <Typography variant="body1" mt={1}>
                {score === mockQuiz.questions.length 
                  ? "Perfect! You got all questions right!"
                  : score >= mockQuiz.questions.length / 2
                    ? "Good job! Keep learning!"
                    : "Keep practicing! You'll get better!"}
              </Typography>
              <Button 
                onClick={handleRetryQuiz}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Retry Quiz
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuiz} sx={{color:"rgb(66, 0, 92)"}}>
            Close
          </Button>
          {!quizSubmitted && (
            <Button 
              onClick={handleSubmitQuiz}
              variant="contained"
              color="primary"
              disabled={Object.values(userAnswers).some(a => a === null)}
              sx={{
                backgroundColor: "rgb(66, 0, 92)",
                '&:hover': {
                  backgroundColor: "rgb(86, 0, 120)",
                }
              }}
            >
              Submit Quiz
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Lesson;