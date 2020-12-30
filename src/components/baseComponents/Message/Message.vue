<template>
  <div class="message" :style="{backgroundColor:color}" v-if="isShow">
    <span class="message-content">{{text}}</span>
    <span @click="close">
      <img
        src='data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdC
        AK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE
        AAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAGq9JREFUeNrt3XtUVOX6B/DnGcCypIWd
        wgDrnNQuWpKz9+jxtiygFMTCS6NmmpmWkpcu3s1QS817WilgalmkFUeNo4YVYl7CC7OHQo6aC3Gh
        nBnyVxKGJ0yY9/fHZjodEy8I8+6Z+X7+ac02Z555ndnfed53X4gAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgKrHsAryVZYtli2XLww+LNqKNaGO1Ugql
        UErr1mKSmCQmVVaSgxzksNvFneJOcefatXnBecF5wYcPy64bwJ+oiqqoyh130DpaR+vMZrFL7BK7
        rrtOjBajxejvv887n3c+7/x338mu01shQK5Q27Zt27Zt27Rp0Pag7UHb09I4juM4rmfPy/09kSyS
        RXJ1NSdyIicuXKhpmqZpr7yi/6nLJft9AfiSdrva7Wq3q00bUxtTG1ObpUu5B/fgHo88UutfECRI
        HDlCTEw8YYL+/dy6Vfb78BYm2QUYnaqqqqrecEOjRo0aNWqUlXWlweGmB0dAgP5oyhSlRClRStLS
        rFar1Wp1bweAa6F3Gt27mwJNgabAffsuGxxuTEx8772kkkrq5s3KLmWXsmvCBNnvx1ugA7kM5ZBy
        SDm0eDEP4SE85OWX6/fZ161r0aJFixYtnnoqPT09PT29ulr2+wXwJuYcc445JzaWTWxi06ZNPJpH
        8+jrr6/zE6qkkiqE+Jv4m/jbY4/Zp9mn2adt2SL7fRoVOpBatPm0zadtPm3ShO6he+iexMSGeZVB
        g4qSipKKkt5/Hx0JwJWr9+Bw00gjjZn/wf/gfyxcqG9k/NCuBQKkFo27N+7euHunTtyBO3CHxo0b
        7IWepqfp6cGDjy06tujYojVr9I0m/LsAXESDBceFaqa2zEHmIHNQZKTs921U2FHV5hAdokO33OKp
        l+O+3Jf7PvWUOkedo85ZvVrfiiABIPJgcFyAl/NyXn7PPbLfv1FhB1WbsTSWxpaWevx1N9JG2vj0
        0+oR9Yh6ZNUqfSOCBPyTrOBw41RO5dTffpM9DkaFHVMtmtia2JrY9u4Vb4u3xdu//OLxAp6kJ+nJ
        YcOUIqVIKVq5Ut+IIAH/IDs43Ivp+mG+drvs8TAq7JBqsZN38k6urORO3Ik7LVkiqw62spWtw4er
        89R56ryUlJqtWNQDnyQ9OGqIuWKumJuVpdk1u2Y/cUL2uBgVAuRyVFJJnTNHTBaTxeSdO6XVkU7p
        lP7ss2qRWqQWIUjAtxgmOGpmHFyHXIdch158Ufa4GB0C5DL0XyDnzweaA82B5sceoyiKoqh9+6QV
        ZCUrWZ97TilUCpXCFSv0jQgS8E6GCY7lYrlYXlnJY3gMj3n88W+7fdvt226HDskeH6NDgFyhA3cd
        uOvAXWfOUDZlU3ZsrD43un+/rHp4AA/gAaNG6VNbqak1WxEk4BXcZ47LDg6ykIUsv/2mf6+tVv0H
        45dfyh4fb4EAuUr6B6y8XH/Uo4fIFtki+8ABaQW5p7YQJOAF3MEhVogVYkVGhuzgEH8VfxV/7dcP
        Z5zXDQKkjtxBwlEcxVHduxsmSLBGAgaE4PBNCJBr5A6S6puqb6q+qUcPkSSSRFJurrSCatZI1CXq
        EnXJm2/KHh/wbwgO34ZfqPXsAfGAeECEhARuDdwauPWrr2gGzaAZFou0gjIpkzKXLtVCtVAt9KWX
        ZI8P+AcEh39AgDQQowWJ6CF6iB5vvmmfa59rn1vfVxUG0CE4/AumsBrId/wdf8c///zb1N+m/ja1
        e3d6iB6ihzRNVj38BX/BX7z0kvvy9LLHB3wLgsM/oQPxEPcdDd03ptK3Koq0ggQJEosX62s4uIEO
        1A2Cw7+hA/GQgwcPHjx4sKys+s3qN6vfjI11b5VWEBMTjx+vLlOXqcvc9z0AuDIIDiBCByKNfu/m
        W281KSbFpGRn84P8ID94//3SCtpO22n7woVaiBaihUyaJHt8wJgQHPBH6EAk0S+V8H//V5VclVyV
        HBMjdoqdYmdBgbSCYiiGYiZOVMYr45Xx8+fLHh8wFgQHXAw6EIOIXBi5MHJhaGjg/YH3B96fnc3T
        eTpPv+8+aQXZyEa2WbM01ljjmTNljw/IgeCAS0EHYhD5E/Mn5k88daqqoKqgqiA6WswWs8Xsf/1L
        WkEWspBlxgzlgHJAOZCUJHt8wLMQHHAl0IEY1N/X/X3d39c1a1Z1fdX1VddnZ9McmkNz2rSRW1VS
        kqZpmqa9/rrs8YGGgeCAq4EOxKD2D9o/aP+gH34IrAysDKyMjqZX6BV6RfblpV97TV2lrlJXTZ8u
        e3ygfiE4oC4CZBcAl/bvDf/e8O8NZ8/ekXBHwh0JGza4Al2BrsD4eDpBJ+jErbd6vCAb2cgWHR1R
        FlEWUVZV5ahyVDmqdu+WPU5QNwgOuBYIEC/hDpLbP7z9w9s/zMgQTuEUzsceo5N0kk7efLPHCwql
        UAqNjg6LCYsJizl/3pnvzHfmI0i8BYID6gOmsLyMfmOrkpKAsQFjA8ZGRelnlB87JqsePsyH+fCc
        OUqOkqPkTJ0qe3zg0hAcUJ+wiO7lLP+x/Mfyn9tvF11FV9F1xw79DPOWLeVWNXWqvtg+b57s8QEd
        ggMaAjoQL2e7wXaD7YaTJ3kP7+E9UVFij9gj9hQVya3qjTfUtepade3kybLHx98hOKAhoQPxMfoO
        4447xDfiG/HNjh3clbty1xYtZNXDRVzERZMn28psZbayBQtkj4+/QHCAJ6AD8TH61XVPnOAu3IW7
        REWJ+WK+mH/8uKx6hFVYhXXePDVdTVfTx46VPT6+DsEBnoSjsHyU0+l0Op3l5eEF4QXhBZs2iQVi
        gVjQuzdncRZnNW3quULISU5m+pV+pV9jYyPORJyJOPPTT47TjtOO0xLvIe9jEBwgAwLEx7mD5LbI
        2yJvi/zsM47jOI7r3ZtyKIdyQkI8V0hNkHSmztQ5Lg5BUj8QHCATAsRPlH5Z+mXpl+Xlt3W8reNt
        HY0TJGE3ht0YduOPPzqLncXO4txc2ePkLRAcYARYRPdT5hxzjjmnVSvTcdNx0/Gvv6YltISWRER4
        vBCVVFKFEH1EH9FnzBh7nD3OHrdihezxMSoEBxgJOhA/Vbq6dHXp6tOnmzVv1rxZ882bTVaT1WTt
        25f20l7ae9NNHiukpiPhci7n8p49wymcwunUKX3qzWaTPU5GgeAAI0IHAkRE1G5cu3Htxt11V4Ar
        wBXg+vprPUjCwz1eSE1HQvEUT/HPP68laAlaQkqK7PGRBcEBRoYOBIiIqHR/6f7S/adPN9/YfGPz
        jVu2iGJRLIr79aMSKqGS4GCPFeJeI6mgCqqIj49wRbgiXKWljlJHqaNU02SPk6cgOMAb4DwQ+B+5
        zXOb5zY/epSbcTNuFh2tb3U6PV6IRhppzCJRJIrEFStUVVVVdehQ2ePT0BAc4E0whQWXZHnd8rrl
        9XvuEZ+Jz8RnO3boW8PCPF7ISBpJI10uakWtqNWwYVq0Fq1Ff/CB7PGpLwgO8EboQOCSbK/aXrW9
        +v33+qPoaLFX7BV7S0s9XkgqpVKqySSaiCaiyZo1ll6WXpZeQ4bIHp9rheAAb4YOBK6KPpV07716
        kOzYwZ24E3e67TZP1yGSRbJIrq6mXtSLej39tP2U/ZT9VFqa7PG5UggO8AUIEKgTJVQJVUIjI7k5
        N+fm27frl5G/5RZP1+FtQYLgAF+CAIFrYrggOUJH6MjQofan7E/Zn/roI9nj44bgAF+ENRC4Jvov
        /vx810HXQdfBhx8W+8Q+se+nnzxdBydyIicGBNC9dC/du3atPtU2aJDs8UFwgC9DBwL1qr21vbW9
        tV276nXV66rXZWVxR+7IHf/yF0/X4e5IuIqruGrIEK2z1lnrvH69p14fwQH+AB0I1Kvc9Nz03PRv
        vw0YFDAoYJD8jkQEikAR+OGHlsGWwZbBAwc29OsiOMCfoAOBBmXpZulm6WY2u+a65rrmZmXxC/wC
        v3DzzXKqOX9e/2///vo92z/7rL6eGcEB/giXMoEG5Sh2FDuKS0sjCiMKIwq/+kosEovEIquVt/E2
        3ta4sWerCaj5vPfrFx4eHh4efvCgftHGI0fq+owIDvBnmMICj7Dtsu2y7crL0zuQRx6hcTSOxpWV
        yakmKEjf4X7yiXpEPaIeSUi42mdAcACgAwEPc9YIOxF2IuyEe0rLaqX9tJ/2e7AjcZCDHAEBdIJO
        0Im+fSN6R/SO6J2f79jh2OHY4T7z/s8QHAD/hQ4EpLDb7Xa7XdNcOa4cV058vNgv9ov9Z854vBAb
        2cjWqJEoESWiJD3dXGQuMhc9+uiF/xuCA+DPsIgOhmAeaR5pHtmpEw/loTz0iy94LI/lsR68jLxb
        zQ7aNdk12TX58cdNj5seNz1+7hyCA+DPECBgKJamlqaWpl26iMVisVi8bRstp+W0vEkTT9chlovl
        YnllpfuxrOBw1yFcwiVcffrkdc7rnNd52zZP1wFwMQgQMCR3kLi2ura6tmZmSutIpA0AOg4wPqyB
        gCHZymxltrJvvjHFm+JN8XFxNJpG0+iKCtl1NTgEB3gRHIUFhuaodFQ6Kk+eDD8ZfjL85O7dNIbG
        0Jj+/SmXcim3USPZ9dUbBAd4IQQIeAX94N8TJ8KCw4LDgvfs4QE8gAdYrV4fJAgO8GIIEPAqznxn
        vjP/D0FyJ9/Jd/bvr5/X4UVBguAAH4A1EPBK9jR7mj1t925XK1crV6uePak9taf2Z8/KruuyEBzg
        Q3AUFvgE9Wf1Z/XnRx4RwSJYBGdkcAfuwB08fa2tS0BwgA9CBwI+QQvRQrSQr77i9tye2/fufeF5
        HNIgOMCHIUDAp4hYESti2XCdtRgoBoqBxqsL4FrgAw0+wZxjzjHnxMayiU1s2rRJ2iVHalPTiej3
        jrdaba/aXrW9+s9/yi4L4FqgAwGvZllpWWlZGRdn2OBwu+CijXW9jDyAkeAwXvBK7uBwRboiXZEb
        Nxo2OC50wWXkwymcwqmg4FpvbAUgAwIEvIpaopaoJT170jE6Rsc2beJZPItneUFwXMgdJBaykAVB
        At4JAQJeQVVVVVXj46kpNaWmGzdSMiVT8nXXya7rmrmDhIiI+vULmxI2JWxKQYFzm3ObcxuCBIwN
        ayBgaOZfzL+Yf+nbV3+0aZPPBMdFBQVRJ+pEndLT1Rw1R8154gnZFQFcCgIEDMkyzjLOMq5fP9ND
        podMD338sb41KEh2XQ2NEzmREwMCRKAIFIEffqh3XoMGya4L4GJwGC8Yin7rWKtV2IRN2Nat008M
        DAz0dB2GuaFUrsgVuVVVbGELWwYN0uyaXbOnp3u6DoCLQQcChmCU4HCfr0HZlE3ZVis/z8/z8wkJ
        ss5sd4+DSBEpImX9eiVUCVVCBw/2+LgAXAQCBKRSViorlZX9+xslOC685Ij+i//LL6UHSc3UFm2h
        LbTl/fcRJGAEOAoLpHAHB42gETTio4+MFhwX/m/64bXHjoXbw+3h9txcsUKsECusVv6cP+fPPVc3
        b+WtvNVkonW0jtYlJEQ4I5wRzuPHHUcdRx1H8/M9Pn7g17AGAh6lBClBStCAAXSOztG5tDSjB0dt
        9Cm37t31IMnIkLZGkiySRXJ1NVdwBVc884wWrUVr0R984Ok6wD9hCgs8wjLYMtgyeOBAbw8ON6NN
        bYkmoolosmaNftTW0KGergP8EzoQaFDu8xnch6X+PpfvaQ18WXWjdCQ0kkbSSJdLhIgQETJ8uL2/
        vb+9//vve7wO8AvoQKBBKK2UVkqrYcOogAqoIC3NV4PDzSgdCaVSKqWaTJzFWZy1Zo2aoWaoGaNG
        ebwO8AtYRId6Zelm6Wbp9swzlEiJlLhqlXuH5vlC5NzIySiL7eQkJzmZqYIqqCI+Xr/W1qlTen02
        m8fqAJ+GKSyoF2qmmqlmDh9OJ+kknVy50t+Co9ZxMcrUlkoqqUKIPqKP6DNmjD3OHmePW7FC1riA
        b0AHAtdE30GOGEF30910N4LjQkbrSLicy7m8Z8+wG8NuDLvxxx+dxc5iZ3FuruxxAu+EAIE6UTKU
        DCXj2We5Nbfm1qmpCI5LM1yQRHIkR8bFRZyJOBNx5qefHKcdpx2nDxyQPU7gXbCIDlfl9+D4gX/g
        H1JSEBxXxzCL7RpppDGLKBElot56S01X09X0sWNljw94F3QgcEUURVEU5bnn+Cyf5bOpqbSZNtNm
        BEddGa0joV/pV/o1NjZchItwUVam17d/v+xxAmNDBwKXZDFbzBbzyJH61WBTUty/XD1fiG8Ex4WM
        1pHo47x0qZKlZClZL7wge3zA2NCBwEX9fv7AWTpLZ5OTERwNy2gdCZdxGZf16BF2a9itYbeWlzsL
        nYXOwn37ZI8TGAsO44X/YQm3hFvCX3pJhIkwEbZkibxC/CM4amOYw39riLfF2+LtadPsne2d7Z3f
        eEP2+IAxoAMBIiJSP1I/Uj96+WX9zHEEh2yG6UhqcCZncmZMTFhMWExYzPnzznxnvjN/927Z4wRy
        IUD8nH7xvfHjaS/tpb2LF0srBMFxUYYLkh/5R/4xJiaiLKIsoqyqylHlqHJUIUj8FRbR/ZSyS9ml
        7JowQX+0aJG0QhAcV8Qwi+01xH3iPnHf7NnqKnWVumr6dNnjA3JgDcTPKH2VvkrfiRO5mIu5eMEC
        aYUgOK6J0dZIdElJmqZpmvb667LHBzwDHYifsDS1NLU0nTQJweEbjNaR6F57TTmgHFAOJCXJHh/w
        DKyB+Dh1rbpWXTt5Mh2lo3R0/nxphSA4GoTh1ki28lbeGhUVFh8WHxZP5LQ77U77zp2yxwkaBjoQ
        H/V7cLxFb9Fb8+ZJKwTB4RFG60g4j/M4b+ZMJV/JV/Ilfv6gQWENxMeoQhWqmDlT33HPmCGtEASH
        VEZbIxHviffEe/Pn2yPtkfbIKVNkjw/UD3QgPkJNUVPUlFmzEBxAZMCOZBgP42GTJyvjlfHKeIlT
        qVCv0IF4Of08jtde0x+9+qq0QhAchma0joS203bavnChFqKFaCGTJskeH6gbdCBeSrErdsXuPlwS
        wQGXZrSOhGIohmImTlSXqcvUZQsXyh4fqBt0IF5GGaOMUcbMns17eS/vfeUVaYUgOLya4ToSQYLE
        4sV60LlPcAWjQwfiJdRKtVKtnDMHwQH1wXAdCRMTjx+vHFIOKYckXlIHrgoCxODUd9R31HfmzqUu
        1IW6TJsmrRAEh08yWpDwEB7CQ15+WZmmTFOmSbyoJ1wRTGEZlL447r5stsTDHhEcfsVwU1uZlEmZ
        S5dqoVqoFvryy/pGIWSPE+jQgRgKs7pEXaIuWbpUf4zgAM8yWkdCcRRHcS++qBQqhUrhihX6Rgk3
        NoOLwj+EITDrHYc7OMaNk1YKggP+wGgdiegn+ol+qan65zIxsWYrOhJJ0IFIxax8r3yvfL9smf4Y
        wQHGYrSOhDfwBt4wcqRapBapRSkpNVvxQ1gSDLwUzMpMZaYy8623eDNv5s1jxkgrBcEBV8FoHQlZ
        yUrWd9/VpmhTtCmjRukbXS7Z4+QvECAexayWqCVqydtvUwIlUMLo0dJKQXDANTBckAgSJFat0jum
        kSP1jQiShoYpLI9gVheoC9QF77yD4ABfYLSpLf08khEjlCKlSClauVLfaML+rYFhgBvUH4LjE/qE
        Pnn+eWmlIDigARgtSNjKVrYOH64sUhYpi959V9+KIGkomMJqEO6jqpYv1x+7jxaRAMEBHmS0qS3x
        hHhCPLFmjX2CfYJ9wrPP6lsxtVVfkMz1ivl/j1dHcIB/MVxHsp7X8/pnnlGPqEfUI6tW6VvRkdQX
        dCD1wmTSO441a/THQ4dKKwXBAQZiuI5kuBguhn/8cXBicGJw4pAhO3kn7+SqKtnj5K1wT/Q6slqt
        Vqs1IKBx48aNGzdGcABcjOHu2Z7HeZx3//3nqs9Vn6u+++67t9y95e4tGRnFs4pnFc/C1NbVQit3
        ldzBcWzRsUXHFiE4AK6E4aa2VvNqXj1wYMW3Fd9WfJuW9qB4UDwoPB9o3g5TWFfo9+Doeqzrsa7v
        vccf8Af8wZAh0gpCcIAXM9rUFj1Kj9Kjn37aZEaTGU1mPPkkprauDALkiphMSolSopSkpXECJ3DC
        E0/IqsT9y024hEu4+vTJ65zXOa/ztm2yRwigLsw55hxzTmwsm9jEpk2bZAeJyBAZImP9entze3N7
        88GD9a2Y2qoNAuQyjHJZdQQH+DKjBYlu3jxN0zRNmzpV9vgYFQKkFuZfzL+Yf2ndmg/zYT588CAn
        ciInBnj8oAMEB/gTowSJSBbJIrm6WrQWrUXrtm3zgvOC84IPH5Y9PkaDRfRa8HE+zseHDkVwAHiO
        +3Pu/tzLWmx3f+/d+wHZ42JUCJDaFFABFaiqx1+3ZnGcsimbsq1WBAf4I/fnXvpRW+EUTuGKIns8
        jAoBUptACqTAoCBPvZz7C+Ia6hrqGpqQgKOqAP57+K+0jiSbsim7USPZ42BUCJBacBEXcdHRow39
        OpiqArg8WVNbntoPeCsESC1cLV0tXS0/+aShnh/BAXD1PB0kDb0f8HY4CusylFPKKeXU1q0cx3Ec
        17PntT4fggOg/jTUUVsiU2SKzM8/t4faQ+2h8fGy36dRoQO5jPMx52POxwweTLNoFs2y2a7t2crL
        3YuCCA6Aa3fhYru+tby8rs8nkkSSSMrN/f17D5eEDuQK6dfKuf76CkuFpcLy4ov6LTRHjNDvhNay
        5Z/+QgfqQB1+/pleoBfohU2buJALuXD2bFsvWy9br6Ii2e8HwBfpJ/62bEl9qS/1nT6dSqiESnr3
        pgN0gA6EhPzpL3ShLtSlsJBUUkldtaq8vLy8vHzp0sJxheMKx507J/v9gI/reLLjyY4nb77Z/cF9
        YNQDox4YFRGh/ynuOwAgn8nk/l66v6fu763sygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDv/D8cBTiO4cdMrwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAy
        MC0xMi0zMFQxMjozMjoyMyswODowMJjo188AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTItMzBU
        MTI6MzI6MjMrMDg6MDDptW9zAAAASHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWlu
        L2ljb24tZm9udC90bXAvaWNvbl8zcm5qZjk5eWg2bi9jbG9zZS5zdmdBNNvKAAAAAElFTkSuQmCC
      '/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    color () {
      let color
      switch (this.type) {
        case 'success':
          color = 'rgb(175, 243, 175)'
          break
        case 'error':
          color = 'rgb(255, 186, 158)'
          break
        case 'warning':
          color = 'lightyellow'
          break
        default:
          color = 'rgb(175, 243, 175)'
      };
      return color
    }
  },
  methods: {
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .message{
    height:40px;
    min-width:30vw;
    position:fixed;
    z-index:10;
    top:50px;
    left:50%;
    border-radius: 5px;
    padding:10px;
    transform: translate(-50%, 0);
    display: flex;
    line-height:20px;
    .message-content{
      margin-right: 10px;
      flex-grow:1;
    }
    img{
      width:16px;
      height:16px;
      vertical-align: bottom;
    }
  }
</style>
