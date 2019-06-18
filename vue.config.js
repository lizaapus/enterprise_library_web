module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        devServer: {
            port: 7000,
            open: true,

            //添加mock数据
            before(app) {
                //用户信息池
                let userpoor = [{
                            username: 'admin',
                            password: '123456'
                        },
                        {
                            username: 'test',
                            password: '123456'
                        }
                    ]
                    //注册接口
                app.get('/api/register', (req, res) => {
                        const {
                            username,
                            password
                        } = req.query
                        const userlength = userpoor.filter(v => v.username == username).length
                        if (userlength > 0) {
                            res.json({
                                success: false,
                                message: '用户名已存在'
                            })
                        } else {
                            userpoor.push({
                                username: username,
                                password: password
                            });
                            res.json({
                                success: true,
                                message: '注册成功'
                            })
                        }
                    })
                    //登录接口
                let tokenkey = 'xdclass'
                app.get('/api/login', (req, res) => {
                        const {
                            username,
                            password
                        } = req.query
                            //console.log(username);

                        const userlength = userpoor.filter(v => v.username == username && v.password == password).length;
                        if (userlength > 0) {
                            res.json({
                                code: 0,
                                message: '登录成功',
                                token: tokenkey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
                            })
                        } else {
                            console.log('enter else');
                            res.json({
                                code: 1,
                                message: '账号或密码错误'
                            })
                        }
                        // if (username == 'admin' && password == '123456' || username == 'test' && password == '123456') {
                        //     res.json({
                        //         code: 0,
                        //         message: '登录成功',
                        //         token: tokenkey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
                        //     })
                        // } else {
                        //     console.log('enter else');
                        //     res.json({
                        //         code: 1,
                        //         message: '账号或密码错误'
                        //     })
                        // }
                    })
                    //获取区域数据
                app.get('/api/sectionData', (req, res) => {
                        res.json({
                            Data: sectionData,
                        })
                    })
                    //获取经营模式数据
                app.get('/api/modeData', (req, res) => {
                    res.json({
                        Data: modeData,
                    })
                })

                //获取指定页数据信息
                app.get('/api/getCompanyList', (req, res) => {
                        const {
                            sectionName,
                            modeName,
                            companyName,
                            startIndex,
                            endIndex,
                        } = req.query;
                        var data = new Array();
                        let tempData = companyDic.filter(c => {
                            let flag = true;
                            if (sectionName != '' && c.sectionName != sectionName)
                                return false;
                            if (modeName != '' && c.modeName != modeName)
                                return false;
                            if (companyName != '' && c.companyName.match(companyName) == null)
                                return false;
                            return true;
                        })
                        for (var i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                            data.push(tempData[i]);
                            //console.log(tempData[i]);
                        }
                        // if (sectionName == '' && modeName == '') {
                        //     try {
                        //         for (var i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                        //             data.push(companyDic[i]);
                        //         }
                        //     } catch (err) {
                        //         console.log(err);
                        //     }

                        // }
                        // if (sectionName != '') {
                        //     let tempData = companyDic.filter(c => c.sectionName == sectionName);
                        //     for (let i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                        //         data.push(tempData[i]);
                        //     }
                        // }
                        // if(modeName != '') {
                        //     let tempData = companyDic.filter(c => c.modeName == modeName);
                        //     for (let i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                        //         data.push(tempData[i]);
                        //     }
                        // }
                        res.json({
                            Data: data,
                        })
                    })
                    //获取页面数据总数
                app.get('/api/getCompanyListTotalNumb', (req, res) => {
                        const {
                            sectionName,
                            modeName,
                            companyName,
                        } = req.query;
                        var len = companyDic.filter(c => {
                            let flag = true;
                            if (sectionName != '' && c.sectionName != sectionName)
                                return false;
                            if (modeName != '' && c.modeName != modeName)
                                return false;
                            if (companyName != '' && c.companyName.match(companyName) == null)
                                return false;
                            return true;
                        }).length;
                        // if (sectionName == '' && modeName == '')
                        //     len = companyDic.length;
                        // if (sectionName != '')
                        //     len = companyDic.filter(c => c.sectionName == sectionName).length;
                        // if (modeName != '')
                        //     len = companyDic.filter(c => c.modeName == modeName).length;

                        res.json({
                            length: len
                        });
                    })
                    //根据url获取公司的详细信息
                app.get('/api/getCompanyDetail', (req, res) => {
                    const {
                        companyUrl
                    } = req.query;
                    var data = companyDic.filter(c => c.companyUrl == companyUrl);
                    res.json({
                        Data: data,
                    })
                })

                //所在地
                const sectionData = [{
                            id: 1,
                            sectionName: '北京',
                            path: 'beijing'
                        },
                        {
                            id: 2,
                            sectionName: '上海',
                            path: 'shanghai'
                        }, {
                            id: 3,
                            sectionName: '广州',
                            path: 'guangzhou'
                        }, {
                            id: 4,
                            sectionName: '河南 郑州',
                            path: 'shenzhen'
                        }, {
                            id: 5,
                            sectionName: '天津',
                            path: 'tianjin'
                        },
                        {
                            id: 6,
                            sectionName: '山东 济南',
                            path: 'shandongJN'
                        },
                    ]
                    //经营模式
                const modeData = [{
                            id: 1,
                            modeName: '全国总代理',
                            path: 'qgzdl'
                        }, {
                            id: 2,
                            modeName: '地区代理',
                            path: 'dqdl'
                        },
                        {
                            id: 3,
                            modeName: '私人经营',
                            path: 'srjy'
                        },
                        {
                            id: 4,
                            modeName: '经销商',
                            path: 'jxs'
                        },
                        {
                            id: 5,
                            modeName: '生产厂家',
                            path: 'sccj'
                        },
                    ]
                    //所有公司信息
                const companyDic = [{
                        id: 1,
                        companyName: '山东康迪医疗设备有限公司',
                        companyUrl: 'http://ssdsst.3618med.com',
                        conpanyDescribe: ' 曲阜市康迪医疗器械有限公司座落在伟大的思想家、教育家、儒家学派创始人孔子的故乡——山东曲阜。 本公司是集研发、生产、经营、销售、技术服务于一体的科技创新型企业。公司拥有国内先进的加工设备、齐全的检测手段和完善的管理体系。 公司通过自主研发，开发出了以无影灯类系列、手术床系列、手术室设备... ',
                        companyImgUrl: 'http://static.3618med.com/resources/c5/87/xtmdhbbtuenwrdxfmsvsafdr_90x90_4.png',
                        modeName: '生产厂家',
                        sectionName: '山东 济南',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/yj/ys/dwcqfwygrpmmcnpuynkkqdbe_234x237_4.jpg',
                                title: '无影灯/LED手术无影灯/整体反射无影灯/整体手术无影灯'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/7a/pu/ljwrujweemknmsvxmdfxlblj_234x237_4.jpg',
                                title: '手术台/电动手术台/电动综合手术台/电动液压手术台'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        address: '山东省曲阜市孔子商贸城伦敦大街52号',
                        Contacts: '吴印周',
                        telephone: '0537-4407766',
                        cellphone: '13505374855  13639420789',
                        email: 'ssdsst@163.com',
                        fax: '0537-4407766',
                        path: 'ssdsst'
                    }, {
                        id: 2,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/5p/mb/dwwfjpbngyhchbfqdpbjuquk_234x200_4.png',
                                title: '25-羟基维生素D检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/4x/nk/bysxrevybenlblagspqvxuma_234x200_4.jpg',
                                title: '基因身份证（基因纽带银卡）'
                            }
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                        ],
                        address: '上海市浦东新区周浦镇康新公路3399弄3号楼202室',
                        Contacts: '邵先生',
                        telephone: '021-20987087  4006508299',
                        cellphone: '13166057876',
                        email: 'ming.shao@majordx.com',
                        fax: '021-20987087  4006508299',
                    }, {
                        id: 3,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/wm/d3/ldpppcpdunsnhsabvphtuetc_234x237_4.png',
                            title: '病理分析前处理试剂'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, ],
                        address: '山东省济南市历下区经十路9777号鲁商国奥城4号楼30层',
                        Contacts: '丁健',
                        telephone: '0531-68620198',
                        cellphone: '15853188677',
                        email: '',
                        fax: '0531-68620198',
                    },
                    {
                        id: 4,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/fx/yr/wbanbbtkmewdyjynulgqjtgg_234x237_4.png',
                            title: 'CTC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hl/wm/vwynrlyqdjjvshmkmxdmeuur_234x237_4.png',
                            title: '肿瘤检测试剂/肿瘤检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/j4/jg/cnvsnfpurjmbdgwlbfyjhuxj_234x237_4.png',
                            title: '肿瘤检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/9x/5j/vuylmrgqqbwanbncnuncannn_234x237_4.png',
                            title: 'HER2扩增检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ax/ks/bwlrbwqjggnesgdspxklfapt_234x237_4.png',
                            title: '白细胞去除试剂盒'
                        }, ],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, ],
                        address: '北京市大兴区亦庄经济开发区宏达南路18号2号楼三层',
                        Contacts: '岳经理',
                        telephone: '01065426198',
                        cellphone: '13522116630',
                        email: '',
                        fax: '01065426198',
                    },
                    {
                        id: 5,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/eu/bx/stmfgtewfhkqfxamfasvdyyk_234x237_4.png',
                            title: '3D/2D数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pn/ym/vfvxuvmtubthxmwllnmgtvjg_234x237_4.png',
                            title: '3D/2D高清工作站'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/a3/tg/etghmxvchppwunfmeytjqwyh_234x237_4.png',
                            title: '3D/2D手术示教系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/xh/nb/uqkdjbmgqcktsuprjmcnypsm_234x237_4.png',
                            title: '病理科信息管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/d5/fx/csvelulvwewkhvfavmkjnxyq_234x237_4.png',
                            title: '超声网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/r3/8u/nugsjvtdejclsnlrclhpuapy_234x237_4.png',
                            title: '科室管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/up/9e/kcrpwgmvydfvwqvlymkdulhw_234x237_4.png',
                            title: '高清影像工作站'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, ],
                        address: '广州市越秀区天河路33号新华楼首层',
                        Contacts: '张永强',
                        telephone: '020-3878392',
                        cellphone: '13924236523',
                        email: 'zhangyx6@vip.163.com',
                        fax: '020-3878392',
                    },
                    {
                        id: 6,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        address: '天津市滨海新区第四大街80号天大科技园B9楼',
                        Contacts: '张小姐  王先生',
                        telephone: '022-27988368',
                        cellphone: '13672048221  13612127335',
                        email: '',
                        fax: '022-27988368',
                    },
                    {
                        id: 7,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                            title: '离子导入治疗仪'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                            title: '天力康透博士理疗电极片'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                            title: '中医定向透药治疗仪（推车式）'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                            title: '中医定向透药治疗仪（台式）'
                        }, ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                                title: '离子导入治疗仪'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                                title: '天力康透博士理疗电极片'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                                title: '中医定向透药治疗仪（推车式）'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                                title: '中医定向透药治疗仪（台式）'
                            },
                        ],
                        address: '河南省郑州市惠济区南阳路宋砦南街升龙汇金商务楼一号',
                        Contacts: '天力康透博士客服',
                        telephone: '4008771158',
                        cellphone: '18003867073',
                        email: '',
                        fax: '4008771158',
                    },
                    {
                        id: 8,
                        companyName: '山东康迪医疗设备有限公司',
                        companyUrl: 'http://ssdsst.3618med.com',
                        conpanyDescribe: ' 曲阜市康迪医疗器械有限公司座落在伟大的思想家、教育家、儒家学派创始人孔子的故乡——山东曲阜。 本公司是集研发、生产、经营、销售、技术服务于一体的科技创新型企业。公司拥有国内先进的加工设备、齐全的检测手段和完善的管理体系。 公司通过自主研发，开发出了以无影灯类系列、手术床系列、手术室设备... ',
                        companyImgUrl: 'http://static.3618med.com/resources/c5/87/xtmdhbbtuenwrdxfmsvsafdr_90x90_4.png',
                        modeName: '生产厂家',
                        sectionName: '山东 济南',
                        path: 'ssdsst',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/yj/ys/dwcqfwygrpmmcnpuynkkqdbe_234x237_4.jpg',
                                title: '无影灯/LED手术无影灯/整体反射无影灯/整体手术无影灯'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/7a/pu/ljwrujweemknmsvxmdfxlblj_234x237_4.jpg',
                                title: '手术台/电动手术台/电动综合手术台/电动液压手术台'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        address: '山东省曲阜市孔子商贸城伦敦大街52号',
                        Contacts: '吴印周',
                        telephone: '0537-4407766',
                        cellphone: '13505374855  13639420789',
                        email: 'ssdsst@163.com',
                        fax: '0537-4407766',
                    }, {
                        id: 10,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/wm/d3/ldpppcpdunsnhsabvphtuetc_234x237_4.png',
                            title: '病理分析前处理试剂'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, ],
                        address: '山东省济南市历下区经十路9777号鲁商国奥城4号楼30层',
                        Contacts: '丁健',
                        telephone: '0531-68620198',
                        cellphone: '15853188677',
                        email: '',
                        fax: '0531-68620198',
                    },
                    {
                        id: 9,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/5p/mb/dwwfjpbngyhchbfqdpbjuquk_234x200_4.png',
                                title: '25-羟基维生素D检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/4x/nk/bysxrevybenlblagspqvxuma_234x200_4.jpg',
                                title: '基因身份证（基因纽带银卡）'
                            }
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                        ],
                        address: '上海市浦东新区周浦镇康新公路3399弄3号楼202室',
                        Contacts: '邵先生',
                        telephone: '021-20987087  4006508299',
                        cellphone: '13166057876',
                        email: 'ming.shao@majordx.com',
                        fax: '021-20987087  4006508299',
                    },
                    {
                        id: 11,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/fx/yr/wbanbbtkmewdyjynulgqjtgg_234x237_4.png',
                            title: 'CTC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hl/wm/vwynrlyqdjjvshmkmxdmeuur_234x237_4.png',
                            title: '肿瘤检测试剂/肿瘤检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/j4/jg/cnvsnfpurjmbdgwlbfyjhuxj_234x237_4.png',
                            title: '肿瘤检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/9x/5j/vuylmrgqqbwanbncnuncannn_234x237_4.png',
                            title: 'HER2扩增检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ax/ks/bwlrbwqjggnesgdspxklfapt_234x237_4.png',
                            title: '白细胞去除试剂盒'
                        }, ],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, ],
                        address: '北京市大兴区亦庄经济开发区宏达南路18号2号楼三层',
                        Contacts: '岳经理',
                        telephone: '01065426198',
                        cellphone: '13522116630',
                        email: '',
                        fax: '01065426198',
                    },
                    {
                        id: 12,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/eu/bx/stmfgtewfhkqfxamfasvdyyk_234x237_4.png',
                            title: '3D/2D数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pn/ym/vfvxuvmtubthxmwllnmgtvjg_234x237_4.png',
                            title: '3D/2D高清工作站'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/a3/tg/etghmxvchppwunfmeytjqwyh_234x237_4.png',
                            title: '3D/2D手术示教系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/xh/nb/uqkdjbmgqcktsuprjmcnypsm_234x237_4.png',
                            title: '病理科信息管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/d5/fx/csvelulvwewkhvfavmkjnxyq_234x237_4.png',
                            title: '超声网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/r3/8u/nugsjvtdejclsnlrclhpuapy_234x237_4.png',
                            title: '科室管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/up/9e/kcrpwgmvydfvwqvlymkdulhw_234x237_4.png',
                            title: '高清影像工作站'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, ],
                        address: '广州市越秀区天河路33号新华楼首层',
                        Contacts: '张永强',
                        telephone: '020-3878392',
                        cellphone: '13924236523',
                        email: 'zhangyx6@vip.163.com',
                        fax: '020-3878392',
                    },
                    {
                        id: 13,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        address: '天津市滨海新区第四大街80号天大科技园B9楼',
                        Contacts: '张小姐  王先生',
                        telephone: '022-27988368',
                        cellphone: '13672048221  13612127335',
                        email: '',
                        fax: '022-27988368',
                    },
                    {
                        id: 14,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                            title: '离子导入治疗仪'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                            title: '天力康透博士理疗电极片'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                            title: '中医定向透药治疗仪（推车式）'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                            title: '中医定向透药治疗仪（台式）'
                        }, ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                                title: '离子导入治疗仪'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                                title: '天力康透博士理疗电极片'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                                title: '中医定向透药治疗仪（推车式）'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                                title: '中医定向透药治疗仪（台式）'
                            },
                        ],
                        address: '河南省郑州市惠济区南阳路宋砦南街升龙汇金商务楼一号',
                        Contacts: '天力康透博士客服',
                        telephone: '4008771158',
                        cellphone: '18003867073',
                        email: '',
                        fax: '4008771158',
                    },
                    {
                        id: 15,
                        companyName: '山东康迪医疗设备有限公司',
                        companyUrl: 'http://ssdsst.3618med.com',
                        conpanyDescribe: ' 曲阜市康迪医疗器械有限公司座落在伟大的思想家、教育家、儒家学派创始人孔子的故乡——山东曲阜。 本公司是集研发、生产、经营、销售、技术服务于一体的科技创新型企业。公司拥有国内先进的加工设备、齐全的检测手段和完善的管理体系。 公司通过自主研发，开发出了以无影灯类系列、手术床系列、手术室设备... ',
                        companyImgUrl: 'http://static.3618med.com/resources/c5/87/xtmdhbbtuenwrdxfmsvsafdr_90x90_4.png',
                        modeName: '生产厂家',
                        sectionName: '山东 济南',
                        path: 'ssdsst',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/yj/ys/dwcqfwygrpmmcnpuynkkqdbe_234x237_4.jpg',
                                title: '无影灯/LED手术无影灯/整体反射无影灯/整体手术无影灯'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/7a/pu/ljwrujweemknmsvxmdfxlblj_234x237_4.jpg',
                                title: '手术台/电动手术台/电动综合手术台/电动液压手术台'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/qm/cg/qyychsqagbaubjvgpttgqjqf_234x237_4.png',
                                title: '产床/妇科产床/电动妇科产床/妇科综合产床/多功能产床'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/ne/5k/vdnhvpfmqheenfdtqkdgvlad_234x237_4.jpg',
                                title: '高频电刀/单极高频电刀/双极高频电刀'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/jp/hc/ngsvjufeavfjsgdlqyccaevm_234x237_4.png',
                                title: '麻醉机/麻醉呼吸机C/呼吸麻醉机'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/74/v9/shpsrmnssbtknpscsxaurmnw_234x237_4.jpg',
                                title: '医用护理床'
                            },
                        ],
                        address: '山东省曲阜市孔子商贸城伦敦大街52号',
                        Contacts: '吴印周',
                        telephone: '0537-4407766',
                        cellphone: '13505374855  13639420789',
                        email: 'ssdsst@163.com',
                        fax: '0537-4407766',
                    }, {
                        id: 16,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd',
                        products: [{
                                imgurl: 'https://static.3618med.com/resources/5p/mb/dwwfjpbngyhchbfqdpbjuquk_234x200_4.png',
                                title: '25-羟基维生素D检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/4x/nk/bysxrevybenlblagspqvxuma_234x200_4.jpg',
                                title: '基因身份证（基因纽带银卡）'
                            }
                        ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/cv/rj/thamtdagwlyjvdhprcpjffnm_234x200_4.jpg',
                                title: '同型半胱氨酸检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/kq/lh/rpyvlflcbpymuaskksthqwfm_234x200_4.jpg',
                                title: '1,5-脱水葡萄糖醇检测试剂盒'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hj/gx/namslvdexddhmkntxbblwxgp_234x200_4.jpg',
                                title: 'HPV自采样基因检测'
                            },
                        ],
                        address: '上海市浦东新区周浦镇康新公路3399弄3号楼202室',
                        Contacts: '邵先生',
                        telephone: '021-20987087  4006508299',
                        cellphone: '13166057876',
                        email: 'ming.shao@majordx.com',
                        fax: '021-20987087  4006508299',
                    }, {
                        id: 17,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/wm/d3/ldpppcpdunsnhsabvphtuetc_234x237_4.png',
                            title: '病理分析前处理试剂'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/xv/yu/cqskkdsrexbcfuqdwdkqsenc_234x237_4.png',
                            title: '病理样本分析前脱水包埋机'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jq/d8/wynlyfxtplldynkjaclyppya_234x237_4.jpg',
                            title: '快速病理诊断前处理设备'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/cu/ha/rjebgamheadwxvwykxdbybjn_234x237_4.jpg',
                            title: '自动组织脱水机'
                        }, ],
                        address: '山东省济南市历下区经十路9777号鲁商国奥城4号楼30层',
                        Contacts: '丁健',
                        telephone: '0531-68620198',
                        cellphone: '15853188677',
                        email: '',
                        fax: '0531-68620198',
                    },
                    {
                        id: 18,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/fx/yr/wbanbbtkmewdyjynulgqjtgg_234x237_4.png',
                            title: 'CTC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hl/wm/vwynrlyqdjjvshmkmxdmeuur_234x237_4.png',
                            title: '肿瘤检测试剂/肿瘤检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/j4/jg/cnvsnfpurjmbdgwlbfyjhuxj_234x237_4.png',
                            title: '肿瘤检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/9x/5j/vuylmrgqqbwanbncnuncannn_234x237_4.png',
                            title: 'HER2扩增检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ax/ks/bwlrbwqjggnesgdspxklfapt_234x237_4.png',
                            title: '白细胞去除试剂盒'
                        }, ],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/uh/68/ranclrvhvfkbecbtrfyucvry_234x237_4.png',
                            title: 'CAC检测'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ng/rv/jvbhvlbehvcsmtpdlakawfvb_234x237_4.png',
                            title: '循环异常细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/84/na/jlmdrkjxhqeghflyhqybaxbx_234x237_4.png',
                            title: '体液脱落细胞检测试剂盒'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/y7/h8/dgmcrpnaetrnfxvqymqlccqj_234x237_4.png',
                            title: '肿瘤早筛/肿瘤评估'
                        }, ],
                        address: '北京市大兴区亦庄经济开发区宏达南路18号2号楼三层',
                        Contacts: '岳经理',
                        telephone: '01065426198',
                        cellphone: '13522116630',
                        email: '',
                        fax: '01065426198',
                    },
                    {
                        id: 19,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/eu/bx/stmfgtewfhkqfxamfasvdyyk_234x237_4.png',
                            title: '3D/2D数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pn/ym/vfvxuvmtubthxmwllnmgtvjg_234x237_4.png',
                            title: '3D/2D高清工作站'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/a3/tg/etghmxvchppwunfmeytjqwyh_234x237_4.png',
                            title: '3D/2D手术示教系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/xh/nb/uqkdjbmgqcktsuprjmcnypsm_234x237_4.png',
                            title: '病理科信息管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/d5/fx/csvelulvwewkhvfavmkjnxyq_234x237_4.png',
                            title: '超声网络系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/r3/8u/nugsjvtdejclsnlrclhpuapy_234x237_4.png',
                            title: '科室管理系统'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/up/9e/kcrpwgmvydfvwqvlymkdulhw_234x237_4.png',
                            title: '高清影像工作站'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/vv/rl/cryyfpufjmelxmxeurxhlkea_234x237_4.png',
                            title: '简易数字化手术室'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/w7/8e/geeepwqwsursxgjacbwqsrby_234x237_4.png',
                            title: '网络直播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/ha/7y/spffqeebqdgjvvymakbkfeql_234x237_4.png',
                            title: '手术转播服务'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/77/wj/mdychnlehcvrcdcudaxdprrf_234x237_4.png',
                            title: '内镜中心网络系统'
                        }, ],
                        address: '广州市越秀区天河路33号新华楼首层',
                        Contacts: '张永强',
                        telephone: '020-3878392',
                        cellphone: '13924236523',
                        email: 'zhangyx6@vip.163.com',
                        fax: '020-3878392',
                    },
                    {
                        id: 20,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        main_products: [{
                            imgurl: 'https://static.3618med.com/resources/k3/sk/gpmdqxajrktnyasvlfeyaxak_234x237_4.jpg',
                            title: '欣奕壳聚糖季铵盐硅凝胶'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/pc/cu/pdfmrkcvkjmygmhmlhgbmprv_234x237_4.png',
                            title: '欣医皮肤屏障修复贴海藻糖敷料'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/jj/8j/xmtvylqwxafumcnttmqschaf_234x237_4.png',
                            title: '欣医皮肤屏障海藻糖喷剂敷料'
                        }],
                        address: '天津市滨海新区第四大街80号天大科技园B9楼',
                        Contacts: '张小姐  王先生',
                        telephone: '022-27988368',
                        cellphone: '13672048221  13612127335',
                        email: '',
                        fax: '022-27988368',
                    },
                    {
                        id: 21,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777',
                        products: [{
                            imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                            title: '离子导入治疗仪'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                            title: '天力康透博士理疗电极片'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                            title: '中医定向透药治疗仪（推车式）'
                        }, {
                            imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                            title: '中医定向透药治疗仪（台式）'
                        }, ],
                        main_products: [{
                                imgurl: 'https://static.3618med.com/resources/4q/qw/yhsgwqcgcuyetgfjnkksgtcq_234x237_4.jpg',
                                title: '离子导入治疗仪'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/hk/h7/pltlxqxmnguschlevvcqveuh_234x237_4.png',
                                title: '天力康透博士理疗电极片'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/mk/xf/uabckpyvhbhpmfxftjgwbvlm_234x237_4.jpg',
                                title: '中医定向透药治疗仪（推车式）'
                            },
                            {
                                imgurl: 'https://static.3618med.com/resources/8g/cg/ryjxhayljffhlgyjkwqplulu_234x237_4.jpg',
                                title: '中医定向透药治疗仪（台式）'
                            },
                        ],
                        address: '河南省郑州市惠济区南阳路宋砦南街升龙汇金商务楼一号',
                        Contacts: '天力康透博士客服',
                        telephone: '4008771158',
                        cellphone: '18003867073',
                        email: '',
                        fax: '4008771158',
                    },

                ]

            }
        }

    }
}