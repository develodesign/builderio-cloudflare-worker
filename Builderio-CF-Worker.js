export default {
  async fetch(request, env, ctx) {

    // Configurable Values
    const BUILDERIO_USE_STATIC_URL = false;
    const BUILDERIO_STATIC_URL = '/builderio-page'
    const BUILDER_IO_MODEL_TYPE = 'page'

    const PLACEHOLDER_TOKEN = '{{builderio}}'
    const REPLACE_PLACEHOLDER_INSTANCE_POSITION_INDEX = 1
    const REPLACE_ALL_PLACEHOLDER_INSTANCES = false
    const REPLACE_IGNORED_PLACEHOLDERS_WITH_CONTENT = ''
    const SHOW_ERROR_WARNING = true
    const WARNING_MESSAGE_CONTENT = '<div>Error loading content</div>'
    
    const url = new URL(request.url)
    const originResponse = await fetch(request)
    let originResponseHtml = await originResponse.text()

    if (originResponseHtml.includes(PLACEHOLDER_TOKEN)) {

      //Fetch response from BuilderIO
      let builderApiUrl = BUILDERIO_USE_STATIC_URL ? BUILDERIO_STATIC_URL : url.pathname;
      builderApiUrl = `https://cdn.builder.io/api/v1/html/${BUILDER_IO_MODEL_TYPE}?apiKey=${env.BUILDER_API_KEY}&url=${builderApiUrl}`   
      const builderResponse = await fetch(builderApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      const builderData = await builderResponse.json();
      const error = SHOW_ERROR_WARNING ? WARNING_MESSAGE_CONTENT : ''
      const builderHtml = builderData?.data?.html || error
      
      // Replace Placeholders with Builder.io content then combine and return the response
      const replaceWidgetInstances = (html, widgetHtml, positionIndex, replaceAll) => {
        if (replaceAll) {
          const placeholderRegex = new RegExp(PLACEHOLDER_TOKEN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          return html.replace(placeholderRegex, widgetHtml);
        } else {
          let matchCount = 0;
          const placeholderRegex = new RegExp(PLACEHOLDER_TOKEN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          return html.replace(placeholderRegex, (match) => {
            matchCount++;
            if (matchCount === positionIndex) {
              return widgetHtml;
            }
            return match;
          });
        }
      };

      originResponseHtml = replaceWidgetInstances(originResponseHtml,builderHtml,
        REPLACE_PLACEHOLDER_INSTANCE_POSITION_INDEX,
        REPLACE_ALL_PLACEHOLDER_INSTANCES
      );

      if (REPLACE_IGNORED_PLACEHOLDERS_WITH_CONTENT) {
        const placeholderRegex = new RegExp(PLACEHOLDER_TOKEN, 'g');
        originResponseHtml = originResponseHtml.replace(placeholderRegex,REPLACE_IGNORED_PLACEHOLDERS_WITH_CONTENT);
      }
    }
    
    return new Response(originResponseHtml, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    });
  },
}
