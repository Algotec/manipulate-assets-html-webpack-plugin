import applyManipulatorsToCompilation from './applyManipulationToCompilation';
import compatAddPluginHook from './compatAddPlugin';

const compatAddPlugin = compatAddPluginHook(
  `ManipulateAssetsHtmlWebpackPlugin`,
);

export default class ManipulateAssetsHtmlWebpackPlugin {
  constructor(manipulators = []) {
    this.manipulators = Array.isArray(manipulators)
      ? manipulators.slice().reverse()
      : [manipulators];
  }

  /* istanbul ignore next: this would be integration tests */
  apply(compiler) {
    compatAddPlugin(compiler, 'compilation', compilation => {
      compatAddPlugin(
        compilation,
        'html-webpack-plugin-before-html-generation',
        (htmlPluginData, callback) =>
          applyManipulatorsToCompilation(
            this.manipulators,
            compilation,
            htmlPluginData,
            callback,
          ),
        true,
      );
    });
  }
}
