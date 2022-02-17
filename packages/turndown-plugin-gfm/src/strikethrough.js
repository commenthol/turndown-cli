/**
 * @see https://github.github.com/gfm/#strikethrough-extension-
 * @param {any} turndownService
 */
export default function strikethrough (turndownService) {
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: function (content) {
      return '~~' + content + '~~'
    }
  })
}
