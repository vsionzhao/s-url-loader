import {getCompiler, compile, getResult} from './helpers'
describe('loader', () => {
  it('should work with html file',async () => {
    const compiler = getCompiler('notice.html');
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]))).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot('errors')
  });

  it('should work with vue file', async () => {
    const compiler = getCompiler('notice-vue.vue');
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

})
