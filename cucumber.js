module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: [
            'steps/**/*.js',
            'support/**/*.js'
        ],
        publishQuiet: true,
        format: [
            'progress-bar',
            'html:reports/cucumber-report.html'
        ]
    }
};