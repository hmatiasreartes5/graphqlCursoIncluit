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

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of all students',
            resolve: () => students
        },
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of all courses',
            resolve: () => courses
        },
        grades: {
            type: new GraphQLList(GradeType),
            description: 'List of all grades',
            resolve: () => grades
        },
        student: {
            type: StudentType,
            description: 'Particular student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
        course: {
            type: CourseType,
            description: 'Particular course',
            args:{
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id === args.id)
        },
        grade: {
            type: GradeType,
            description: 'Particular grade',
            args: {
                id: {type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id === args.id)
        }
    })
})

module.exports = RootQueryType;