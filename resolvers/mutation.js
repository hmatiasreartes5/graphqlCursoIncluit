const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const students = require('../json/student.json');
const grades = require('../json/grade.json');
const courses = require('../json/course.json');

const StudentType = require('../Types/student');
const GradeType = require('../Types/grade');
const CourseType = require('../Types/course');

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addStudent: {
            type: StudentType,
            description: 'Add student',
            args: {
                name:{ type: GraphQLNonNull(GraphQLString) },
                lastname: { type: GraphQLNonNull(GraphQLString) },
                courseID: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent, args) => {
                students.map(student=>{
                    if (student.name === args.name && student.lastname === args.lastname) {
                        throw new Error('that student already exists')
                    }
                });
                const student = {
                    id: students.length + 1,
                    name: args.name,
                    lastname: args.lastname,
                    courseID: args.courseID
                };
                students.push(student);
                return student;
            }
        },
        addCourse: {
            type: CourseType,
            description: 'Add course',
            args: {
                name:{ type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve:(parent, args) => {
                courses.map(course=>{
                    if (course.name === args.name) {
                        throw new Error('that course already exists')
                    }
                });
                const course = {
                    id: courses.length + 1,
                    name: args.name,
                    description: args.description
                };
                courses.push(course);
                return course;
            }
        },
        addGrade: {
            type: GradeType,
            description: 'Add grade',
            args: {
                grade:{ type: GraphQLNonNull(GraphQLString) },
                courseID: { type: GraphQLNonNull(GraphQLInt)},
                studentID: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent, args) => {
                const grade = {
                    id: grades.length + 1,
                    grade: args.grade,
                    courseID: args.courseID,
                    studentID: args.studentID
                };
                grades.push(grade);
                return grade;
            }
        },
        deleteStudent: {
            type: StudentType,
            description: 'Delete student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                
                let studentDelete;
                students.map(student=>{
                    if (student.id === args.id) {
                        studentDelete = true
                    }
                });
                if(studentDelete === true){
                    studentDelete = students.filter(student => student.id !== args.id);
                }
                return studentDelete;
            }
        },
        deleteCourse: {
            type: CourseType,
            description: 'Delete course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                
                let courseDelete;
                courses.map(course=>{
                    if (course.id === args.id) {
                        courseDelete = true
                    }
                });
                if(courseDelete === true){
                    courseDelete = courses.filter(course => course.id !== args.id);
                }
                return courseDelete;
            }
        },
        deleteGrade: {
            type: GradeType,
            description: 'Delete grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                
                let gradeDelete;
                grades.map(grade=>{
                    if (grade.id === args.id) {
                        gradeDelete = true
                    }
                });
                if(gradeDelete === true){
                    gradeDelete = grades.filter(grade => grade.id !== args.id);
                }
                return gradeDelete;
            }
        }
    })
});

module.exports = RootMutationType;