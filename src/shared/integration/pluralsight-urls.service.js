const _baseUrl = 'https://app.pluralsight.com';
const _channelsUrl = _baseUrl + '/channels/api';
const _learnerUrl = _baseUrl + '/learner';

const PluralsightURLs = {
    Login: _baseUrl + '/id/',
    User: _channelsUrl + '/users',
    Channels: _channelsUrl + '/channels/user',
    Progress: _channelsUrl + '/channels/progress',
    ChannelCourses: id => _channelsUrl + `/channels/${id}/content`,
    ChannelDetails: id => _channelsUrl + `/channels/${id}/content-details`,

    CourseDetails : id => _learnerUrl + `/content/courses/${id}`,
    CourseProgress: id => _learnerUrl + `/user/courses/${id}/progress`,

    CourseQuizResults: id => _learnerUrl + `/user/courses/${id}/learning-checks`,
};

angular.module('pluralsight', [])
.constant('PluralsightURLs', PluralsightURLs);