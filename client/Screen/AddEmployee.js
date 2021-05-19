import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Header, Icon, Container, Left, Body, Title } from 'native-base';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nama:'',
        alamat:'',
        jabatan: '',
        gaji: '',
        listData:[],
        idEdit:null,
    };
    this.url = "https://server-buat-react.herokuapp.com/api.php";
  }
  componentDidMount(){
      this.ambilListData()
  }
  async ambilListData(){
    await fetch(this.url)
    .then((response)=>response.json())
    .then((json)=>{
        console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
        this.setState({listData:json.data.result});
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  klikSimpan(){
      if(this.state.nama == '' || this.state.alamat == '' || this.state.jabatan == '' || this.state.gaji == ''){
        alert('Silahkan diisi semua');
      }else{
        var urlAksi = this.url+"/?op=create";
          fetch(urlAksi,{
              method:'post',
              headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
              },
              body:"nama="+this.state.nama+"&alamat="+this.state.alamat+"&jabatan="+this.state.jabatan+"&gaji="+this.state.gaji
          })
          .then((response)=>response.json())
          .then((json)=>{
              this.setState({nama:''});
              this.setState({alamat:''});
              this.setState({jabatan:''});
              this.setState({gaji:''});
              this.ambilListData();
          })
        ToastAndroid.show('Data berhasil ditambah', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      }
  }
  render() {
    return (
      <Container style={{justifyContent: 'center', backgroundColor: '#ACF8FF'}}>
        <Header transparent>
            <Left>
                <TouchableOpacity transparent
                onPress={() => {this.props.navigation.replace('DrawerNavigationRoutes')}}>
                    <Icon name='arrow-back' style={{color: '#296F63'}} />
                </TouchableOpacity>
            </Left>
            <Body></Body>
        </Header>
        <Image source={require('../assets/Images/gambar2.png')} style={{marginTop: -30}} />
        <View style={style.viewWrapper}>
            <View style={style.viewForm}>
                <TextInput 
                    style={style.textInput1}
                    placeholder="Masukkan Nama"
                    value={this.state.nama}
                    onChangeText={(text)=>this.setState({nama:text})}
                    >
                </TextInput>
                <TextInput
                    style={style.textInput2}
                    placeholder="Masukkan Alamat"   
                    value={this.state.alamat}
                    onChangeText={(text)=>this.setState({alamat:text})} 
                ></TextInput>
                <TextInput
                    style={style.textInput2}
                    placeholder="Jabatan"   
                    value={this.state.jabatan}
                    onChangeText={(text)=>this.setState({jabatan:text})} 
                ></TextInput>
                <TextInput
                    style={style.textInput2}
                    placeholder="Gaji"   
                    value={this.state.gaji}
                    onChangeText={(text)=>this.setState({gaji:text})} 
                ></TextInput>
                <TouchableOpacity 
                    style={style.button}
                    onPress={()=>this.klikSimpan()}>
                    <Text style={{color: 'white', textAlign: 'center', marginTop: 10.5}}>Masukkan Data</Text>
                </TouchableOpacity>
            </View>
      </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
    viewWrapper:{
        flex:1
    },
    viewForm:{
        flex:2, 
        marginTop: 10,
        backgroundColor: '#F5FCFE',
        borderRadius: 30
    },
    viewData:{
        flex:4
    },
    textInput1:{
        marginTop: 40,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        borderRadius:31.5,
        marginBottom:10,
        backgroundColor:'#F5F4F2'
    },
    textInput2:{
        marginTop: 15,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        borderRadius:31.5,
        marginBottom:10,
        backgroundColor:'#F5F4F2'
    },
    viewList:{
        flexDirection:'row',
        padding:5, 
        borderBottomWidth:2,
        borderBottomColor:'#dedede'
    },
    textListNama:{
        flex:3,
        fontSize:20,
        fontWeight:'bold'
    },
    textListEdit:{
        color:'white',
        marginRight:4,
        padding:10,
        backgroundColor: '#878787',
        borderRadius:5
    },
    textListDelete:{
        color:'white',
        padding:10,
        backgroundColor: 'red',
        borderRadius:5
    },
    button: {
        marginTop: 15,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        backgroundColor: '#296F63',
        borderRadius: 31.5,
        height: 43.64
    }
})
export default AddEmployee;
