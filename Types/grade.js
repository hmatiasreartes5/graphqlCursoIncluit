const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql')

const CourseType = require('./course');
const courses = require('../json/course.json');
const StudentType = require('./student');
const students = require('../json/student.json');

const GradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represent grade',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        grade: { type: GraphQLNonNull(GraphQLString) },
        courseID: { type: GraphQLNonNull(GraphQLInt) },
        studentID: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: (grade) => {
                return courses.find(course => course.id === grade.courseID);
            }
        },
        student: {
            type: StudentType,
            resolve: (grade) => {
                return students.find(student => student.id === grade.studentID );
            }
        }
    })
});

module.exports = GradeType;