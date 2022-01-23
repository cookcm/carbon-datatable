export default function(e) {
    if (e.keyCode === 13) {
        if (typeof e.target.click === 'function') {
            e.target.click();
        } else {
            e.target.parentElement.click();
        }
    }
}
