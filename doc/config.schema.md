
# gitxl configuration file. Schema

```
bbenoist/gitxl
```

gitxl configuration file.

| Abstract | Extensible | Status | Identifiable | Custom Properties | Additional Properties | Defined In |
|----------|------------|--------|--------------|-------------------|-----------------------|------------|
| Can be instantiated | No | Experimental | No | Forbidden | Forbidden |  |

# gitxl configuration file. Properties

| Property | Type | Required | Defined by |
|----------|------|----------|------------|
| [branches](#branches) | `object` | Optional | gitxl configuration file. (this schema) |
| [depends](#depends) | `string[]` | Optional | gitxl configuration file. (this schema) |
| [remotes](#remotes) | `object` | Optional | gitxl configuration file. (this schema) |

## branches

Branches managed by the tool

`branches`
* is optional
* type: `object`
* defined in this schema

### branches Type


`object` with following properties:


| Property | Type | Required |
|----------|------|----------|
| `merge`| array | Optional |
| `track`| string | Optional |



#### merge

List of branches to merge into

`merge`
* is optional
* type: `string[]`


##### merge Type


Array type: `string[]`

All items must be of the type:
`string`



  
Branch name (e.g. master)









#### track

Another branch to track 'e.g. `origin/<branch>`)

`track`
* is optional
* type: `string`

##### track Type


`string`











## depends

List of branches from which HEAD is depending on

`depends`
* is optional
* type: `string[]`

* defined in this schema

### depends Type


Array type: `string[]`

All items must be of the type:
`string`



  
Branch name (e.g. master)







## remotes

Git remotes to add/update

`remotes`
* is optional
* type: `object`
* defined in this schema

### remotes Type


`object` with following properties:


| Property | Type | Required |
|----------|------|----------|





