import {
    Selector
} from 'testcafe';
import AsyncTestUtil from 'async-test-util';

const BASE_PAGE = 'http://127.0.0.1:8080/e2e.html';

fixture`Example page`
    .page`http://127.0.0.1:8080/`;


// BroadcastChannel
[
    'native',
    'idb',
    'localstorage',
    'default'
].forEach(methodType => {
    test.page(BASE_PAGE + '?methodType=' + methodType + '&autoStart=startBroadcastChannel')('test(BroadcastChannel) with method: ' + methodType, async () => {
        console.log('##### START BroadcastChannel TEST WITH ' + methodType);

        await AsyncTestUtil.wait(500);

        await AsyncTestUtil.waitUntil(async () => {
            const stateContainer = Selector('#state');
            const exists = await stateContainer.exists;
            if (!exists) {
                console.log('stateContainer not exists');
                return false;
            } else {
                console.log('stateContainer exists');
            }
            const value = await stateContainer.innerText;
            //       console.log(value);

            // const out = await t.getBrowserConsoleMessages();
            // console.log('out:');
            // console.log(JSON.stringify(out));

            // make a console.log so travis does not terminate because of no output
            console.log('BroadcastChannel(' + methodType + ') still no success');

            return value === 'SUCCESS';
        }, 0, 500);
    });
});


// LeaderElection
[
    'native',
    'idb',
    'localstorage',
    'default'
].forEach(methodType => {
    test.page(BASE_PAGE + '?methodType=' + methodType + '&autoStart=startLeaderElection')('test(LeaderElection) with method: ' + methodType, async () => {
        console.log('##### START LeaderElection TEST WITH ' + methodType);
        const stateContainer = Selector('#state');

        await AsyncTestUtil.waitUntil(async () => {
            const value = await stateContainer.innerText;
            //       console.log(value);

            // const out = await t.getBrowserConsoleMessages();
            // console.log('out:');
            // console.log(JSON.stringify(out));

            // make a console.log so travis does not terminate because of no output

            const iframeAmount = await Selector('#leader-iframes iframe').count;
            console.log('LeaderElection(' + methodType + ') still no success (' + iframeAmount + ' iframes left)');

            return value === 'SUCCESS';
        }, 0, 1000);
        console.log('LeaderElection(' + methodType + ') DONE');
    });
});
