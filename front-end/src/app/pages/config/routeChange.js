(function() {
  'use strict';

  angular.module('BlurAdmin.pages.config')
    .run(stateChangeStart);

  /** @ngInject */
  function stateChangeStart($rootScope, $state, localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      var login = localStorage.getObject('dataUser');
      if (toState.authenticate && _.isEmpty(login)) {
        // User isn’t authenticated
        // console.log('User isn’t authenticated - toState.authenticate: '+toState.authenticate);

        $state.transitionTo("authSignIn");
        event.preventDefault();
      } else {





        var UsersPremmisions = login['role'];


        // console.log('toState:');
        // console.log(toState);
        // console.log('UsersPremmisions:');
        // console.log(UsersPremmisions);
        // console.log(PagePremmisions);

        if(toState.authenticate) {
          var PagePremmisions = toState.params.authRoles;
            

          var matches = UsersPremmisions.filter(function(item){
            return PagePremmisions.indexOf(item) > -1
          })

          if(matches.length > 0) { // Good Access

          } else {
            $state.transitionTo("main.dashboard");
            event.preventDefault();
          }
        }

  
        // console.log("Total matches: ", matches.length);
        // console.log(JSON.stringify(UsersPremmisions)==JSON.stringify(PagePremmisions));
        // var tt = equals(UsersPremmisions,toState.params.authRoles);
        // console.log(tt);


        // console.log('User is authenticated - toState.authenticate: '+toState.authenticate);
      }
    });
  }

})();