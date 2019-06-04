module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        devServer: {
            port: 7000,
            open: true,
            //添加mock数据
            before(app) {
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
                        startIndex,
                        endIndex,
                    } = req.query;
                    var data = new Array();
                    if (sectionName == '' && modeName == '') {
                        try {
                            for (var i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                                data.push(companyDic[i]);
                            }
                        } catch (err) {
                            console.log(err);
                        }

                    }
                    if (sectionName != '') {
                        let tempData = companyDic.filter(c => c.sectionName == sectionName);
                        for (let i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                            data.push(tempData[i]);
                        }
                    }
                    if (modeName != '') {
                        let tempData = companyDic.filter(c => c.modeName == modeName);
                        for (let i = parseInt(startIndex); i < parseInt(endIndex); i++) {
                            data.push(tempData[i]);
                        }
                    }
                    res.json({
                        Data: data,
                    })
                })
                //获取页面数据总数
                app.get('/api/getCompanyListTotalNumb', (req, res) => {
                    const {
                        sectionName,
                        modeName,
                    } = req.query;
                    var len = 0;
                    if (sectionName == '' && modeName == '')
                        len = companyDic.length;
                    if (sectionName != '')
                        len = companyDic.filter(c => c.sectionName == sectionName).length;
                    if (modeName != '')
                        len = companyDic.filter(c => c.modeName == modeName).length;
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
                        path: 'ssdsst'
                    }, {
                        id: 2,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd'
                    }, {
                        id: 3,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj'
                    },
                    {
                        id: 4,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel'
                    },
                    {
                        id: 5,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg'
                    },
                    {
                        id: 6,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang'
                    },
                    {
                        id: 7,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777'
                    },
                    {
                        id: 8,
                        companyName: '山东康迪医疗设备有限公司',
                        companyUrl: 'http://ssdsst.3618med.com',
                        conpanyDescribe: ' 曲阜市康迪医疗器械有限公司座落在伟大的思想家、教育家、儒家学派创始人孔子的故乡——山东曲阜。 本公司是集研发、生产、经营、销售、技术服务于一体的科技创新型企业。公司拥有国内先进的加工设备、齐全的检测手段和完善的管理体系。 公司通过自主研发，开发出了以无影灯类系列、手术床系列、手术室设备... ',
                        companyImgUrl: 'http://static.3618med.com/resources/c5/87/xtmdhbbtuenwrdxfmsvsafdr_90x90_4.png',
                        modeName: '生产厂家',
                        sectionName: '山东 济南',
                        path: 'ssdsst'
                    }, {
                        id: 10,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj'
                    },
                    {
                        id: 9,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd'
                    },
                    {
                        id: 11,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel'
                    },
                    {
                        id: 12,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg'
                    },
                    {
                        id: 13,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang'
                    },
                    {
                        id: 14,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777'
                    },
                    {
                        id: 15,
                        companyName: '山东康迪医疗设备有限公司',
                        companyUrl: 'http://ssdsst.3618med.com',
                        conpanyDescribe: ' 曲阜市康迪医疗器械有限公司座落在伟大的思想家、教育家、儒家学派创始人孔子的故乡——山东曲阜。 本公司是集研发、生产、经营、销售、技术服务于一体的科技创新型企业。公司拥有国内先进的加工设备、齐全的检测手段和完善的管理体系。 公司通过自主研发，开发出了以无影灯类系列、手术床系列、手术室设备... ',
                        companyImgUrl: 'http://static.3618med.com/resources/c5/87/xtmdhbbtuenwrdxfmsvsafdr_90x90_4.png',
                        modeName: '生产厂家',
                        sectionName: '山东 济南',
                        path: 'ssdsst'
                    }, {
                        id: 16,
                        companyName: '上海美吉逾华生物医药科技有限公司',
                        companyUrl: 'http://majorivd.3618med.com',
                        conpanyDescribe: '上海美吉美吉逾华建有800多平米高质量的符合GMP规范的高标准洁净生产厂房，基于自身在质谱、分子生物学以及一代测序和二代高通量测序领域的深厚研发基础和雄厚的技术储备，形成以分子诊断技术为主导的集产品研发、生产、销售于一体的经营理念，以拥有强大的研发队伍、规范的生产体系和完善的营销及售后服务网络为核心竞争力，逐步发展成为专业从事体外诊断产品的高科技公司，并形成在体外诊断领域市场的优势地位.',
                        companyImgUrl: 'http://static.3618med.com/resources/lt/4b/rxvpgevdmbjwfefearshplny_90x90_4.png',
                        modeName: '全国总代理',
                        sectionName: '上海',
                        path: 'majorivd'
                    }, {
                        id: 17,
                        companyName: '山东骏腾医疗科技有限公司',
                        companyUrl: 'http://jtkj.3618med.com',
                        conpanyDescribe: ' 山东骏腾医疗科技有限公司于2015年成立，坐落于美丽的泉城--济南，是一家集生产、研发、销售、服务四位一体的医疗器械高新技术企业。      公司自成立以来一直致力于病理学技术的研究，以“Happiness Tree”为核心品牌，先后推出多款型号的HT系列快速组织处理系统及处理试剂，具有快速、... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '经销商',
                        sectionName: '山东 济南',
                        path: 'jtkj'
                    },
                    {
                        id: 18,
                        companyName: '莱尔生物医药科技有限公司',
                        companyUrl: 'http://cyttel.3618med.com',
                        conpanyDescribe: ' 莱尔生物医药科技有限公司（莱尔生物）成立于2009年，现为万孚生物（股票代码：300482）旗下子公司，是国内专注从事循环肿瘤细胞（Circulating Tumor Cell，CTC）检测技术体系与产品体系开发及应用的企业。         北京莱尔生物医药科技有限公司总部位于北京亦庄生物医...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/w5/cr/uxcqnjytxvrehyjajvgsshxc_90x90_4.jpg',
                        modeName: '私人经营',
                        sectionName: '北京',
                        path: 'cyttel'
                    },
                    {
                        id: 19,
                        companyName: '广州高通影像技术有限公司',
                        companyUrl: 'http://goldenimg.3618med.com',
                        conpanyDescribe: ' 广州高通影像技术有限公司是一家专业的医学影像信息技术的研发公司，公司的销售和技术骨干 员工均在医学影像行业具有15年的开发、销售及售后经验。产品分为内镜影像信息管理系统、超声影像信息管理系统、医学显微图像分析系统、病理科信息管理系统、放射科影像信息管理系统、远程医疗会诊系统、视频监控教学传输系... ',
                        companyImgUrl: 'http://static.3618med.com/resources/ab/y3/mnypgkfsbcmrqemgaqxhyclm_90x90_4.jpg',
                        modeName: '地区代理',
                        sectionName: '广州',
                        path: 'goldenimg'
                    },
                    {
                        id: 20,
                        companyName: '天津嘉氏堂科技有限公司',
                        companyUrl: 'http://jiashitang.3618med.com',
                        conpanyDescribe: ' 天津嘉氏堂科技有限公司，创建于2009年，是嘉氏堂体系产品的研发和生产基地，公司先后通过了“天津市科技型中小企业”、“滨海新区高新技术企业”的认定，并于2013年及2016年通过了高新技术企业、专利培育示范单位的认定。截止2018年12月，共收获26项国家发明专利证书。     公司业务范围包...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/sh/wh/njdxbvvhwacmtymsnqhfmelg_90x90_4.png',
                        modeName: '经销商',
                        sectionName: '天津',
                        path: 'jiashitang'
                    },
                    {
                        id: 21,
                        companyName: '郑州天力康生物科技有限公司',
                        companyUrl: 'http://hyjt777.3618med.com',
                        conpanyDescribe: ' 郑州天力康生物科技有限公司成立于2010年，隶属弘毅医药集团，总部坐落于美丽的历史名都绿城郑州，依托中原地区独特的自然和人文资源，已经发展成为一家集医疗器械、医用耗材、保健品、保健用品、消字号产品、药妆、医疗卫生用品等为一体的现代化医疗生物科技发展公司，公司始终坚持“以人为本、质量第一、互利共...            ',
                        companyImgUrl: 'http://static.3618med.com/resources/qe/55/wshumvkfvauvhdfjntnjmlex_90x90_4.jpg',
                        modeName: '生产厂家',
                        sectionName: '河南 郑州',
                        path: 'hyjt777'
                    },

                ]

            }
        }

    }
}