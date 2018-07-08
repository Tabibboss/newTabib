(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($scope, localStorage, $state,$http,toastr,themeLayoutSettings) {
    var vm = this;
    var Theme = themeLayoutSettings;
    // gfgf = _.intersection();
    vm.logar = logar;
    // console.log(Theme);
    init();

    function init() {
      localStorage.clear();
    }

    function logar() {
      if (vm.user) {
       if (vm.passWord) {

          var dataUser = {
            user: vm.user,
            passWord: vm.passWord,
            role: ['admin','Kof'],
          };

          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
                  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                  'Access-Control-Allow-Credentials': true,

              }
          }

          if(!Theme.mobile) {
          // $http.post('System/get.php', dataUser, config)
          $http.post('http://tabibboss.com/API/Login.php', dataUser, config)
            .success(function (data, status, headers, config) {
         
                $scope.PostDataResponse = data;
                if(data=='ok') {

                  


                  localStorage.setObject('dataUser', dataUser);
                  $('body #stars,body #stars2,body #stars3').remove();

                  $state.go('main.dashboard');

                  // console.log('success - Log Me In -'+data);
                } else {

                  toastr.error('שם משתמש וסיסמה אינם נכונים, אנא נסה שנית', '', {
                    "autoDismiss": true,
                    "type": "error",
                    "timeOut": 5000,
                    "extendedTimeOut": "2000",
                    "allowHtml": false,
                    "closeButton": true,
                    "tapToDismiss": true,
                    "progressBar": false,
                    "newestOnTop": true,
                    "maxOpened": 0,
                    "preventDuplicates": false,
                    "preventOpenDuplicates": false
                  })
                  // console.log('success - Stay Here In -'+data);
                }
                
            })
            .error(function (data, status, header, config) {
              // console.log('error'+data);
            });
          } else {
            localStorage.setObject('dataUser', dataUser);
            $('body #stars,body #stars2,body #stars3').remove();

            $state.go('main.dashboard');

            // console.log('success - Log Me In');
          }

  

        } else {
          toastr.error('חובה להכניס סיסמה', '', {
            "autoDismiss": true,
            "type": "error",
            "timeOut": 5000,
            "allowHtml": false,
            "closeButton": true,
            "tapToDismiss": true,
            "progressBar": false,
            "newestOnTop": true,
            "maxOpened": 0,
            "preventDuplicates": false,
            "preventOpenDuplicates": false
          })

        }
    } else {
      toastr.error('חובה להכניס שם משתמש', '', {
        "autoDismiss": false,
        "type": "error",
        "timeOut": 5000,
        "allowHtml": false,
        "closeButton": true,
        "tapToDismiss": true,
        "progressBar": false,
        "newestOnTop": true,
        "maxOpened": 0,
        "preventDuplicates": false,
        "preventOpenDuplicates": false
      })
    }

  }







  }

})();