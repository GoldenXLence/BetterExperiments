/**
 * @name BetterExperiments
 * @author GoldenXLence
 * @description Better Discord plugin that enables experiments and other staff only options in Discord
 * @version 1.0.0
 */

let wpRequire

module.exports = class Experiments {
    load() {}

    start = () => {
        
        window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
        let mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.Z?.isDeveloper !== "undefined");
        let usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
        let nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes)
        try {
            nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
        } catch (e) {}
        let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
        usermod.exports.default.__proto__.getCurrentUser = () => ({isStaff: () => true})
        nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
        usermod.exports.default.__proto__.getCurrentUser = oldGetUser
    }

    stop = () => {}
}
