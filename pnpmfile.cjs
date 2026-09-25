module.exports = {
    hooks: {
        readPackage(pkg) {
            if (pkg.name === "sass-loader" && pkg.peerDependencies) {
                delete pkg.peerDependencies["node-sass"];
                if (pkg.peerDependenciesMeta) {
                    delete pkg.peerDependenciesMeta["node-sass"];
                }
            }
            return pkg;
        },
    },
};
