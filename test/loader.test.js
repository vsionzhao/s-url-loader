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

  it('should work with options: limit',async () => {
    const compiler = getCompiler('limit.vue', {limit: 100 * 1024});
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

  it('should work with options exclude that is String Array ',async () => {
    const compiler = getCompiler('exclude.vue', {
      exclude:['/test/fixtures/test2.png','/test/fixtures/testmin.png']
    });
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

  it('should work with options exclude that is RegExp',async () => {
    const compiler = getCompiler('exclude.vue', {
      exclude:/(2.png)$/
    });
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

  it('should work with options include that is String Array',async () => {
    const compiler = getCompiler('include.vue', {
      include:['/test/fixtures/test3.png']
    });
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

  it('should work with options include that is RegExp',async () => {
    const compiler = getCompiler('include.vue', {
      include:/(min.png)$/
    });
    const stats = await compile(compiler);
    const compilation = stats.compilation;
    const assets = compilation.assets;
    const assetsKeys = Object.keys(assets);
    expect(getResult(assetsKeys.map(v => assets[v]),'vue')).toMatchSnapshot('result');
    expect(assetsKeys).toMatchSnapshot('assets');
    expect(compilation.errors).toMatchSnapshot(`errors`)
  });

})
