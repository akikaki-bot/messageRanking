# MessageRanking Core

**注意 : デバックしてません**

# 動かし方

コンパイルして

```cmd
$ tsc src
```

```js

const { MessageRankingCore } = require("./path/to/src/index.js")

client.on('messageCreate', message => {

    const Ranking = new MessageRankingCore(message)

    if(message.content === "!syuukei") {
       const Datas = await Ranking.end() // 結果が返って来そう。（しらんけど）
    } 
})

```