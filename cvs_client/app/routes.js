// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  const appModule = Promise.resolve(import('containers/App/sagas'))
  appModule.then((sagas) => injectSagas(sagas.default))
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MainPage/reducer'),
          import('containers/MainPage/sagas'),
          import('containers/MainPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/productAll',
      name: 'productAll',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProductAll/reducer'),
          import('containers/ProductAll/sagas'),
          import('containers/ProductAll'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productAll', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/recipeAll',
      name: 'recipeAll',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RecipeAll/reducer'),
          import('containers/RecipeAll/sagas'),
          import('containers/RecipeAll'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('recipeAll', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'userLogin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/UserLogin/reducer'),
          import('containers/UserLogin/sagas'),
          import('containers/UserLogin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('userLogin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/productDetail/:id',
      name: 'productDetail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProductDetail/reducer'),
          import('containers/ProductDetail/sagas'),
          import('containers/ProductDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productDetail', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {

      path: '/search/:id',
      name: 'searchPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPage/reducer'),
          import('containers/SearchPage/sagas'),
          import('containers/SearchPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
        injectReducer('searchPage', reducer.default);
        injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/search',
      name: 'searchPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPage/reducer'),
          import('containers/SearchPage/sagas'),
          import('containers/SearchPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('searchPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/newRecipe',
      name: 'newRecipe',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewRecipe/reducer'),
          import('containers/NewRecipe/sagas'),
          import('containers/NewRecipe'),

        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('newRecipe', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/newReview/:id',
      name: 'newReview',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewReview/reducer'),
          import('containers/NewReview/sagas'),
          import('containers/NewReview'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('newReview', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/recipeDetail/:id',
      name: 'recipeDetail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RecipeDetail/reducer'),
          import('containers/RecipeDetail/sagas'),
          import('containers/RecipeDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('recipeDetail', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
