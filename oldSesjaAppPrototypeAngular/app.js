(function () {
    function initFirebase() {
        var config = {
            apiKey: "AIzaSyDIDacwpiPlPTCSKd2Z4LbGx0Ql6YenOF4",
            authDomain: "sesjaapp.firebaseapp.com",
            databaseURL: "https://sesjaapp.firebaseio.com",
            storageBucket: "sesjaapp.appspot.com",
        };
        firebase.initializeApp(config);
    }

    initFirebase();

    angular.module('sesjaApp', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            //
            // Now set up the states
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "login.html",
                    controller: 'LoginController'
                })
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "dashboard.html",
                    controller: 'DashboardController'
                });
        }])
        .controller('LoginController',['$scope', '$state', function ($scope, $state) {
            $scope.loginToApp = function () {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;

                    console.log(user, ' :)');

                    localStorage.setItem('isLogged', true);
                    $state.go('dashboard');
                }).catch(function(error) {
                    localStorage.setItem('isLogged', false);
                });
            };
        }])
        .controller('DashboardController',['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
            var db = firebase.database(),
                courseRef = db.ref('course/');

            window.test = courseRef;
            function initMaterializeControls() {
                $('.datepicker').pickadate({
                    monthsFull: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                    weekdaysShort: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
                    today: 'Dziś',
                    clear: false,
                    close: 'Wybierz',
                    format: 'd mmmm yyyy',
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15 // Creates a dropdown of 15 years to control year
                });
                $('select').material_select();
            }

            $scope.addNewCourse = function (newCourseName) {
                db.ref('course/' + newCourseName).set({
                    active: true
                });

                $scope.newCourseName = '';
            };

            $scope.addMaterialOpenModal = function (courseId) {
                $scope.currentEditCourse = courseId;
                $('#add-material-modal').openModal();
            };

            $scope.addTerminOpenModal = function (courseId) {
                $scope.currentEditCourse = courseId;
                $('#add-termin-modal').openModal();
            };

            $scope.addCourseEvent = function () {
                var date = $('#add-termin-modal .datepicker')[0].value,
                    type;
                    $('#select-event-type option').each(function (index, option) {
                        if(option.selected && !option.disabled) {
                            type = option.text;
                        }
                    });

                db.ref('course/' + $scope.currentEditCourse + '/events').push({
                    type: type,
                    date: date
                });
            };

            $scope.addMaterialToCourse = function (materialContent, materialLink) {
                db.ref('course/' + $scope.currentEditCourse + '/materials').push({
                    materialLink: materialLink,
                    materialContent: materialContent
                });
            };

            courseRef.on('value',function (snapshot) {
                var courses = snapshot.val();
                $scope.courses = [];
                console.log('hej hej');

                console.log(courses);
                for(var key in courses) {
                    $timeout(function (course, key) {
                        var courseMaterials = [],
                            courseEvents = [];
                        for(var key2 in course.materials) {
                            courseMaterials.push(course.materials[key2]);
                        }
                        for(var key3 in course.events) {
                            courseEvents.push(course.events[key3]);
                        }
                        $scope.courses.push(Object.assign({}, course, {materials: courseMaterials, events: courseEvents,name: key, id: key.replace(/ /g, '')}));
                    }.bind(null, courses[key], key), 0);
                }
                $timeout(function () {
                    initMaterializeControls();
                    console.log($scope.courses);
                }, 1);
            });
        }]);

    /*
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {

    });*/
})();