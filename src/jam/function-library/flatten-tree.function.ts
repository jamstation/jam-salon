export function flattenTree ( tree, dataProperty, childrenProperty ): any[]
{
    let p = [];
    if ( tree.length > 0 ) {
        tree.forEach( item =>
        {
            p = [ ...p, item[ dataProperty ], ...flattenTree( item[ childrenProperty ], dataProperty, childrenProperty ) ];
        } );
    }
    return p;
}
