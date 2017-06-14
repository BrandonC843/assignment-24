import $ from 'jquery';
import React from 'react'
import ReactDOM from 'react-dom'

const SettingListState = React.createClass({
   getInitialState: function(){
         return {
         theChores: []
      }
   },

   _updatingTheList: function(newChore){

      let choreArrayCopy = this.state.theChores.map(function(copy){return copy})
      choreArrayCopy.push(newChore)
      this.setState({
         theChores: choreArrayCopy
      })


   },


   _finishedTheChore: function(choreToRemove){
      console.log(choreToRemove)
      let finishedChore = this.state.theChores.filter(function(listObj){
         if (choreToRemove !== listObj.item){
            return true
         } else {
            return false
         }
      })
         this.setState({
            theChores: finishedChore
         })

   },

   _createJsxBlockQuotes: function(arrayOfListObjects){
      // <blockquote>
      //    <div className="list-inline">
      //       <span><input ref="doneList" type="checkbox" className="form-inline"></input> {objList.item}</span>
      //       <button className= "btn btn-sm"  onClick={this._handleDoneChore}><i className="fa fa-times-circle-o"/></button>
      //    </div>
      // </blockquote>
      let component = this
      let jsxArray = arrayOfListObjects.map(function(objList, index){
         return(
            <ListItem removeItemCb={component._finishedTheChore}  objList={objList} key={index}/>

         )
      })
      return jsxArray
   },


   render: function(){
      return (
         <div className="chore_list">
            <h1> To Do List </h1>
				<InputComponent updateListCb={this._updatingTheList}/>
				<hr/>
            <div className="chores">
   				{this._createJsxBlockQuotes(this.state.theChores)}
   			</div>

			</div>
      )
   }
})

const InputComponent = React.createClass({

   _handleNewItem: function(){
      let newObjList = {
         item: this.refs.listInput.value
      }
      this.props.updateListCb(newObjList)
         this.refs.listInput.value = ''
   },

   render: function(){
		return (
			<div className="list-inline">
				<input ref="listInput" type='text' className="form-inline" placeholder=" To Do List "/>
				<button className="btn btn-plus btn-md" onClick={this._handleNewItem}><i className="fa fa-plus"/></button>
			</div>
		)
	}
})

const ListItem = React.createClass({
   _handleDoneChore: function(){
      console.log('firing')
      console.log(this.props)
      // let doneObjList = {
      //    item: this.refs.doneList.value
      // }
         this.props.removeItemCb(this.props.objList.item)

      //    this.refs.doneList.value = ''
   },



   render: function (){
      console.log(this.props)
      return (

         <blockquote>
            <div className="list-inline">
               <span><input ref="doneList" type="checkbox" className="form-inline"></input> {this.props.objList.item}</span>
               <button className= "btn btn-fail btn-lg"  onClick={this._handleDoneChore}><i className="fa fa-times"></i>
               </button>
            </div>
         </blockquote>
      )
   }
})

ReactDOM.render(<SettingListState/>, document.querySelector('#app-container') )
