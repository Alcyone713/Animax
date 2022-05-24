export const makeRequest = (method, url, data) => {
    return new Promise(function (resolve, reject) {
        var counter = 0;
        const tryRequest = () => {
            counter++;
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                if (counter > 5) {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                } else {
                    setTimeout(()=>{
                        tryRequest()
                    }, (Math.floor(Math.random() * 60) + 2) * 1000);
                }
            };
            if (method === "POST" && data) {
                xhr.send(data);
            } else {
                xhr.send();
            }
        };
        tryRequest()
    });
};